import { useState } from "react";

export default function ProductModal({ product, formatPrice, maxQuantity, onClose, addToCart }) {
  const defaultOption = product.options.find((option) => option.isDefault) || product.options[0];
  const [selectedOptionId, setSelectedOptionId] = useState(defaultOption.id);
  const [selectedExtras, setSelectedExtras] = useState(() => new Set());
  const [quantity, setQuantity] = useState(1);

  const selectedOption = product.options.find((option) => option.id === selectedOptionId) || defaultOption;
  const extras = product.extras || [];
  const selectedExtraList = extras.filter((extra) => selectedExtras.has(extra.id));
  const unitTotal = calculateTotal(product, selectedOption, selectedExtraList);
  const lineTotal = unitTotal * quantity;

  function toggleExtra(extraId) {
    setSelectedExtras((current) => {
      const next = new Set(current);
      if (next.has(extraId)) {
        next.delete(extraId);
      } else {
        next.add(extraId);
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
    const extraSignature = selectedExtraList.map((extra) => extra.id).sort().join("|");
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

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="product-modal" role="dialog" aria-modal="true" aria-labelledby="product-modal-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="product-modal__head">
          <div>
            <span className="category-label">{product.categoryName}</span>
            <h2 id="product-modal-title">{product.name}</h2>
            {product.description && <p>{product.description}</p>}
          </div>
          <button className="modal-close" type="button" onClick={onClose} aria-label="Cerrar configuracion">
            x
          </button>
        </div>

        <div className="option-group">
          <h3>Elige una opcion</h3>
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
                  <small>{option.addPrice > 0 ? `+ ${formatPrice(option.addPrice)}` : "Incluido"}</small>
                </span>
              </label>
            ))}
          </div>
        </div>

        {extras.length > 0 && (
          <div className="option-group">
            <h3>Extras</h3>
            <div className="choice-stack">
              {extras.map((extra) => (
                <label className="choice-row" key={extra.id}>
                  <input
                    type="checkbox"
                    checked={selectedExtras.has(extra.id)}
                    onChange={() => toggleExtra(extra.id)}
                  />
                  <span>
                    <strong>{extra.name}</strong>
                    <small>+ {formatPrice(extra.price)}</small>
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="quantity-row">
          <span>Cantidad</span>
          <div className="qty-control">
            <button type="button" onClick={() => updateQuantity(quantity - 1)} aria-label="Restar cantidad">-</button>
            <input
              type="number"
              min="1"
              max={maxQuantity}
              value={quantity}
              onChange={(event) => updateQuantity(event.target.value)}
              aria-label="Cantidad"
            />
            <button type="button" onClick={() => updateQuantity(quantity + 1)} aria-label="Sumar cantidad">+</button>
          </div>
        </div>

        <div className="modal-total">
          <span>Total configurado</span>
          <strong>{formatPrice(lineTotal)}</strong>
        </div>

        <button className="primary-button" type="button" onClick={handleAddToCart}>
          Añadir al carrito - {formatPrice(lineTotal)}
        </button>
      </section>
    </div>
  );
}

function calculateTotal(product, selectedOption, selectedExtras) {
  const extrasTotal = selectedExtras.reduce((sum, extra) => sum + extra.price, 0);
  return product.basePrice + selectedOption.addPrice + extrasTotal;
}
