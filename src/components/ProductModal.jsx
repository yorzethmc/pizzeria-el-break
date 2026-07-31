import { useState, useEffect } from "react";

export default function ProductModal({ product, formatPrice, maxQuantity, onClose, addToCart, whatsappUrl, t }) {
  const defaultOption = product.options.find((option) => option.isDefault) || product.options[0];
  const [selectedOptionId, setSelectedOptionId] = useState(defaultOption.id);
  const [selectedExtras, setSelectedExtras] = useState(() => ({}));
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const selectedOption = product.options.find((option) => option.id === selectedOptionId) || defaultOption;
  const extras = product.extras || [];
  const selectedExtraList = Object.entries(selectedExtras).map(([id, qty]) => {
    const extra = extras.find(e => e.id === id);
    return { ...extra, qty };
  });
  const unitTotal = product.priceOnRequest ? 0 : calculateTotal(product, selectedOption, selectedExtraList);
  const lineTotal = unitTotal * quantity;

  function updateExtraQuantity(extraId, nextQty) {
    setSelectedExtras((current) => {
      const parsedQty = Number.parseInt(nextQty, 10);
      if (Number.isNaN(parsedQty)) return current;
      const validQty = Math.max(parsedQty, 0);
      const next = { ...current };
      if (validQty <= 0) {
        delete next[extraId];
      } else {
        next[extraId] = Math.min(validQty, 20); // max 20 extras of same type
      }
      return next;
    });
  }

  function updateQuantity(nextQuantity) {
    const parsedQuantity = Number.parseInt(nextQuantity, 10);
    if (Number.isNaN(parsedQuantity)) {
      setQuantity(1);
      return;
    }
    setQuantity(Math.min(Math.max(parsedQuantity, 1), maxQuantity));
  }

  function handleAddToCart() {
    const extraSignature = selectedExtraList.map((extra) => `${extra.id}x${extra.qty}`).sort().join("|");
    const signature = `${product.id}::${selectedOption.id}::${extraSignature}`;

    addToCart({
      cartId: `${signature}::${Date.now()}`,
      signature,
      productId: product.id,
      name: product.name,
      description: product.description,
      option: selectedOption,
      extras: selectedExtraList,
      unitPrice: unitTotal,
      quantity,
      subtotal: lineTotal
    });
  }

  const visualImage = product.image || product.categoryImage;

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="product-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" type="button" onClick={onClose} aria-label="Cerrar modal">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>

        {visualImage && (
          <div className="product-modal__image">
            <img src={`${import.meta.env.BASE_URL}${visualImage.startsWith("/") ? visualImage.slice(1) : visualImage}`} alt="" />
          </div>
        )}
        <div className="product-modal__head">
          <div>
            <h2 id="modal-title">{product.name}</h2>
            {product.description && <p>{product.description}</p>}
          </div>
        </div>

        <div className="product-modal__scrollable">
          <div className="option-group">
            <h3>{t.chooseOption}</h3>
            <div className="choice-stack">
              {product.options.map((option) => (
                <label className="choice-row" key={option.id} onClick={() => setSelectedOptionId(option.id)}>
                  <input
                    type="radio"
                    name={`option-${product.id}`}
                    checked={selectedOptionId === option.id}
                    onChange={() => setSelectedOptionId(option.id)}
                  />
                  <span>
                    <strong>{option.name}</strong>
                    <small>{option.addPrice > 0 ? `+ ${formatPrice(option.addPrice)}` : t.included}</small>
                  </span>
                </label>
              ))}
            </div>
          </div>

          {extras.length > 0 && (
            <div className="option-group">
              <h3>{t.extrasLabel}</h3>
              <div className="choice-stack">
                {extras.map((extra) => {
                  const qty = selectedExtras[extra.id] || 0;
                  return (
                    <div className="choice-row choice-row--extra" key={extra.id}>
                      <div className="choice-info">
                        <strong>{extra.name}</strong>
                        <small>+ {formatPrice(extra.price)}</small>
                      </div>
                      <div className="qty-control qty-control--extra">
                        <button type="button" onClick={() => updateExtraQuantity(extra.id, qty - 1)} aria-label={t.decreaseQty}>-</button>
                        <input
                          type="number"
                          min="0"
                          max="20"
                          value={qty}
                          onChange={(event) => updateExtraQuantity(extra.id, event.target.value)}
                        />
                        <button type="button" onClick={() => updateExtraQuantity(extra.id, qty + 1)} aria-label={t.increaseQty}>+</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="product-modal__footer">
          {product.priceOnRequest ? (
            <>
              <p className="total-note">{t.priceOnRequestNote}</p>
              <a className="primary-button" href={whatsappUrl} target="_blank" rel="noreferrer">
                {t.askWhatsapp}
              </a>
            </>
          ) : (
            <>
              <div className="quantity-row">
                <span>{t.quantity}</span>
                <div className="qty-control">
                  <button type="button" onClick={() => updateQuantity(quantity - 1)} aria-label={t.decreaseQty}>-</button>
                  <input
                    type="number"
                    min="1"
                    max={maxQuantity}
                    value={quantity}
                    onChange={(event) => updateQuantity(event.target.value)}
                    aria-label={t.quantity}
                  />
                  <button type="button" onClick={() => updateQuantity(quantity + 1)} aria-label={t.increaseQty}>+</button>
                </div>
              </div>

              <button className="primary-button" type="button" onClick={handleAddToCart}>
                {t.addToCart} - {formatPrice(lineTotal)}
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

function calculateTotal(product, selectedOption, selectedExtras) {
  const extrasTotal = selectedExtras.reduce((sum, extra) => sum + (extra.price * extra.qty), 0);
  return product.basePrice + selectedOption.addPrice + extrasTotal;
}
