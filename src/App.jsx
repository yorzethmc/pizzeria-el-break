import { useEffect, useMemo, useState } from "react";
import ProductCard from "./components/ProductCard.jsx";
import ProductModal from "./components/ProductModal.jsx";
import { allMenuItems, menuCategories } from "./menuData.js";

const MAX_QTY = 50;
const WHATSAPP_PHONE = "+50662331212";
const CREATOR_PHONE = "+50688292124";
const CREATOR_INSTAGRAM = "yorzethmc";
const SERVICE_TIME_ZONE = "America/Costa_Rica";
const SERVICE_WINDOWS = {
  Fri: [[17 * 60 + 30, 21 * 60 + 30]],
  Sat: [[17 * 60 + 30, 21 * 60 + 30]],
  Sun: [
    [12 * 60 + 30, 15 * 60],
    [17 * 60 + 30, 21 * 60]
  ]
};
const SCHEDULE_TEXT = "Viernes y sabado de 5:30 p. m. a 9:30 p. m. Domingo de 12:30 p. m. a 3:00 p. m. y de 5:30 p. m. a 9:00 p. m.";

const currency = new Intl.NumberFormat("es-CR", {
  style: "currency",
  currency: "CRC",
  maximumFractionDigits: 0
});

function formatPrice(value) {
  return currency.format(value);
}

function getServiceStatus(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: SERVICE_TIME_ZONE,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23"
  }).formatToParts(date);

  const weekday = parts.find((part) => part.type === "weekday")?.value;
  const hour = Number(parts.find((part) => part.type === "hour")?.value || 0);
  const minute = Number(parts.find((part) => part.type === "minute")?.value || 0);
  const currentMinutes = hour * 60 + minute;
  const windows = SERVICE_WINDOWS[weekday] || [];
  const isOpen = windows.some(([start, end]) => currentMinutes >= start && currentMinutes < end);

  return {
    isOpen,
    currentMinutes,
    weekday
  };
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState("todo");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderType, setOrderType] = useState("express");
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("sinpe");
  const [cashAmount, setCashAmount] = useState("");
  const [errors, setErrors] = useState([]);
  const [confirmation, setConfirmation] = useState(null);
  const [location, setLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState("");
  const [locationError, setLocationError] = useState("");
  const [isLocating, setIsLocating] = useState(false);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = window.setInterval(() => setNow(new Date()), 60000);
    return () => window.clearInterval(interval);
  }, []);

  const serviceStatus = useMemo(() => getServiceStatus(now), [now]);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return allMenuItems.filter((item) => {
      const matchesCategory = activeCategory === "todo" || item.categoryId === activeCategory;
      const optionText = (item.options || []).map((option) => option.name).join(" ");
      const extraText = (item.extras || []).map((extra) => extra.name).join(" ");
      const searchable = `${item.name} ${item.description || ""} ${item.categoryName} ${optionText} ${extraText}`.toLowerCase();
      return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [activeCategory, query]);

  const cartItems = cart;

  const cartTotal = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  function addToCart(configuredProduct) {
    setCart((current) => {
      const existingIndex = current.findIndex((item) => item.signature === configuredProduct.signature);

      if (existingIndex === -1) {
        return [configuredProduct, ...current];
      }

      const next = [...current];
      const existingItem = next[existingIndex];
      next[existingIndex] = {
        ...existingItem,
        quantity: existingItem.quantity + configuredProduct.quantity,
        subtotal: existingItem.subtotal + configuredProduct.subtotal
      };

      return next;
    });
    setConfirmation(null);
    setErrors([]);
    setSelectedProduct(null);
  }

  function removeCartItem(cartId) {
    setCart((current) => current.filter((item) => item.cartId !== cartId));
  }

  function validateOrder() {
    const nextErrors = [];

    if (!serviceStatus.isOpen) {
      nextErrors.push("El servicio no esta disponible en este momento.");
    }

    if (cartItems.length === 0) {
      nextErrors.push("Selecciona al menos un producto del menu.");
    }

    if (!customerName.trim()) {
      nextErrors.push("Escribe el nombre completo.");
    }

    if (orderType === "express" && !address.trim()) {
      nextErrors.push("Escribe la direccion de entrega.");
    }

    if (orderType === "express" && paymentMethod === "efectivo" && !cashAmount.trim()) {
      nextErrors.push("Indica con cuanto paga la persona.");
    }

    return nextErrors;
  }

  function submitOrder(event) {
    event.preventDefault();
    const nextErrors = validateOrder();
    if (nextErrors.length > 0) {
      setErrors(nextErrors);
      setConfirmation(null);
      return;
    }

    const message = buildWhatsappMessage();
    const whatsappUrl = buildWhatsappUrl(message);
    const opened = window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    if (!opened) {
      window.location.href = whatsappUrl;
    }

    setConfirmation({
      total: cartTotal,
      message: "Se abrio WhatsApp con el pedido listo para enviar."
    });
    setCart([]);
    setCustomerName("");
    setAddress("");
    setCashAmount("");
    setLocation(null);
    setLocationStatus("");
    setLocationError("");
    setErrors([]);
  }

  function requestLocation() {
    setLocationError("");
    setLocationStatus("");

    if (!navigator.geolocation) {
      setLocationError("Este navegador no permite tomar la ubicacion actual.");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const accuracy = Math.round(position.coords.accuracy || 0);

        setLocation({
          latitude,
          longitude,
          accuracy,
          googleMapsUrl: buildGoogleMapsUrl(latitude, longitude),
          wazeUrl: buildWazeUrl(latitude, longitude)
        });
        setLocationStatus("Ubicacion lista. Se enviara en el mensaje de WhatsApp.");
        setIsLocating(false);
      },
      (error) => {
        const errorMessages = {
          1: "El cliente no dio permiso para usar su ubicacion.",
          2: "No se pudo detectar la ubicacion actual.",
          3: "La ubicacion tardo demasiado en responder."
        };
        setLocationError(errorMessages[error.code] || "No se pudo obtener la ubicacion.");
        setIsLocating(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 12000,
        maximumAge: 60000
      }
    );
  }

  function clearLocation() {
    setLocation(null);
    setLocationStatus("");
    setLocationError("");
  }

  function buildWhatsappMessage() {
    const isExpress = orderType === "express";
    const lines = [
      "*POLLOS EMI - NUEVO PEDIDO*",
      "------------------------------",
      "",
      `*Tipo:* ${isExpress ? "Express" : "Para llevar"}`,
      `*Cliente:* ${customerName.trim()}`
    ];

    if (isExpress) {
      lines.push(`*Direccion:* ${address.trim()}`);
      lines.push(`*Pago:* ${paymentMethod === "sinpe" ? "SINPE Movil" : "Efectivo"}`);

      if (paymentMethod === "efectivo") {
        lines.push(`*Paga con:* ${cashAmount.trim()}`);
      }

      lines.push("");
      lines.push("*Importante:* El total no incluye el costo del express.");
    }

    lines.push(
      ""
    );

    if (isExpress && location) {
      lines.push("*Ubicacion actual*");
      lines.push(`Google Maps: ${location.googleMapsUrl}`);
      lines.push(`Waze: ${location.wazeUrl}`);
      if (location.accuracy) {
        lines.push(`Precision aproximada: ${location.accuracy} m`);
      }
      lines.push("");
    }

    lines.push("------------------------------");
    lines.push("*Detalle del pedido*");
    cartItems.forEach((item) => {
      lines.push(`- ${item.quantity} x ${item.name}`);
      lines.push(`  Opcion: ${item.option.name}`);
      if (item.extras.length > 0) {
        lines.push(`  Extras: ${item.extras.map((extra) => extra.name).join(", ")}`);
      }
      lines.push(`  Subtotal: ${formatPrice(item.subtotal)}`);
      if (item.description) {
        lines.push(`  ${item.description}`);
      }
    });

    lines.push("------------------------------");
    lines.push(isExpress ? `*Total sin express:* ${formatPrice(cartTotal)}` : `*Total:* ${formatPrice(cartTotal)}`);
    lines.push("");
    lines.push("Gracias.");

    return lines.join("\n");
  }

  return (
    <div className="app">
      <header className="hero">
        <div className="hero__content">
          <div className="brand">
            <span className="brand__mark">PE</span>
            <div>
              <p className="eyebrow">Menu interactivo</p>
              <h1>Pollos Emi</h1>
            </div>
          </div>

          <div className="hero__summary">
            <span>{allMenuItems.length} opciones</span>
            <strong>{formatPrice(cartTotal)}</strong>
          </div>
        </div>
      </header>

      <main className="menu-layout">
          <section className="menu-main" aria-labelledby="menu-title">
            <div className="tool-row">
              <div>
                <p className="eyebrow">Comida rapida</p>
                <h2 id="menu-title">Elige y arma el pedido</h2>
              </div>

              <label className="search-box">
                <span>Buscar</span>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="pollo, papas, bebida..."
                />
              </label>
            </div>

            <div className="category-strip" aria-label="Categorias">
              <button
                className={`category-pill ${activeCategory === "todo" ? "is-active" : ""}`}
                type="button"
                onClick={() => setActiveCategory("todo")}
              >
                <span>🔥</span>
                Todo
              </button>
              {menuCategories.map((category) => (
                <button
                  className={`category-pill ${activeCategory === category.id ? "is-active" : ""}`}
                  type="button"
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <span>{category.icon}</span>
                  {category.shortName}
                </button>
              ))}
            </div>

            <div className="category-showcase">
              {menuCategories.map((category) => (
                <button
                  type="button"
                  className={`showcase-card tone-${category.color}`}
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.image && <img src={category.image} alt="" />}
                  <span className="showcase-card__shade" aria-hidden="true" />
                  <span className="showcase-card__icon">{category.icon}</span>
                  <span>
                    <strong>{category.name}</strong>
                    <small>{category.items.length} productos base</small>
                  </span>
                </button>
              ))}
            </div>

            <div className="menu-grid">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <ProductCard
                    product={item}
                    formatPrice={formatPrice}
                    key={item.id}
                    onConfigure={() => setSelectedProduct(item)}
                  />
                ))
              ) : (
                <div className="empty-state">
                  No encontre platos con esa busqueda.
                </div>
              )}
            </div>
          </section>

          <aside className="cart-panel" aria-label="Resumen del pedido">
            <div className="cart-panel__head">
              <div>
                <p className="eyebrow">Pedido</p>
                <h2>Resumen</h2>
              </div>
              <span className="cart-badge">{itemCount}</span>
            </div>

            {cartItems.length > 0 ? (
              <ul className="cart-list">
                {cartItems.map((item) => (
                  <li key={item.id} className="cart-line">
                    <div>
                      <strong>{item.name}</strong>
                      <span>{item.quantity} x {item.option.name}</span>
                      {item.extras.length > 0 && (
                        <span>Extras: {item.extras.map((extra) => extra.name).join(", ")}</span>
                      )}
                    </div>
                    <div className="cart-line__actions">
                      <b>{formatPrice(item.subtotal)}</b>
                      <button type="button" onClick={() => removeCartItem(item.cartId)}>
                        Quitar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty-state">Agrega productos del menu.</p>
            )}

            <div className="total-row">
              <span>{orderType === "express" ? "Total sin express" : "Total"}</span>
              <strong>{formatPrice(cartTotal)}</strong>
            </div>
            {orderType === "express" && (
              <p className="total-note">Este monto no contempla el costo del express.</p>
            )}

            <div className={`service-card ${serviceStatus.isOpen ? "service-card--open" : "service-card--closed"}`}>
              <strong>{serviceStatus.isOpen ? "Servicio disponible ahora" : "Servicio no disponible ahora"}</strong>
              <p>{SCHEDULE_TEXT}</p>
              {!serviceStatus.isOpen && <p>Puedes revisar el menu, pero no se pueden tomar ordenes fuera de horario.</p>}
            </div>

            <form className="checkout-form" onSubmit={submitOrder}>
              <div className="mode-box">
                <span>Tipo de pedido</span>
                <div className="mode-switch" role="radiogroup" aria-label="Tipo de pedido">
                  <button
                    className={orderType === "express" ? "is-active" : ""}
                    type="button"
                    onClick={() => setOrderType("express")}
                  >
                    Express
                  </button>
                  <button
                    className={orderType === "pickup" ? "is-active" : ""}
                    type="button"
                    onClick={() => {
                      setOrderType("pickup");
                      clearLocation();
                    }}
                  >
                    Para llevar
                  </button>
                </div>
              </div>

              <label>
                Nombre completo
                <input value={customerName} onChange={(event) => setCustomerName(event.target.value)} />
              </label>

              {orderType === "express" && (
                <>
                  <label>
                    Direccion de entrega
                    <textarea value={address} onChange={(event) => setAddress(event.target.value)} />
                  </label>

                  <div className="payment-box">
                    <span>Metodo de pago</span>
                    <div className="payment-options" role="radiogroup" aria-label="Metodo de pago">
                      <button
                        className={paymentMethod === "sinpe" ? "is-active" : ""}
                        type="button"
                        onClick={() => setPaymentMethod("sinpe")}
                      >
                        SINPE
                      </button>
                      <button
                        className={paymentMethod === "efectivo" ? "is-active" : ""}
                        type="button"
                        onClick={() => setPaymentMethod("efectivo")}
                      >
                        Efectivo
                      </button>
                    </div>
                  </div>

                  {paymentMethod === "efectivo" && (
                    <label>
                      Con cuanto paga
                      <input
                        value={cashAmount}
                        onChange={(event) => setCashAmount(event.target.value)}
                        placeholder="Ej: 10000"
                      />
                    </label>
                  )}

                  <div className="location-box">
                    <div className="location-copy">
                      <strong>Ubicacion por GPS</strong>
                      <p>Para enviarla por WhatsApp, el cliente debe aceptar compartir la ubicacion cuando el navegador lo pregunte.</p>
                    </div>
                    <div className="location-actions">
                      <button className="location-button" type="button" onClick={requestLocation} disabled={isLocating}>
                        <span aria-hidden="true">📍</span>
                        <strong>{isLocating ? "Buscando ubicacion..." : "Compartir ubicacion"}</strong>
                        <small>Debes aceptar el permiso</small>
                      </button>
                      {location && (
                        <button className="ghost-button" type="button" onClick={clearLocation}>
                          Quitar ubicacion
                        </button>
                      )}
                    </div>
                    {locationStatus && <p className="location-note location-note--ok">{locationStatus}</p>}
                    {locationError && <p className="location-note location-note--error">{locationError}</p>}
                    {location && (
                      <div className="location-links">
                        <a href={location.googleMapsUrl} target="_blank" rel="noreferrer">Google Maps</a>
                        <a href={location.wazeUrl} target="_blank" rel="noreferrer">Waze</a>
                      </div>
                    )}
                  </div>
                </>
              )}

              {errors.length > 0 && (
                <div className="alert alert--error" role="alert">
                  {errors.map((error) => (
                    <p key={error}>{error}</p>
                  ))}
                </div>
              )}

              <button className="primary-button" type="submit" disabled={!serviceStatus.isOpen}>
                {serviceStatus.isOpen ? "Enviar pedido por WhatsApp" : "Fuera de horario"}
              </button>
            </form>

            {confirmation && (
              <div className="alert alert--success">
                <strong>{confirmation.message}</strong>
                <p>Total: {formatPrice(confirmation.total)}</p>
              </div>
            )}
          </aside>
      </main>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          formatPrice={formatPrice}
          maxQuantity={MAX_QTY}
          onClose={() => setSelectedProduct(null)}
          addToCart={addToCart}
        />
      )}

      <footer className="site-footer">
        <span>Created by Erick Yorzeth Masis Cavero</span>
        <a href={`https://wa.me/${CREATOR_PHONE.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">
          {CREATOR_PHONE}
        </a>
        <a href={`https://www.instagram.com/${CREATOR_INSTAGRAM}/`} target="_blank" rel="noreferrer">
          Instagram: @{CREATOR_INSTAGRAM}
        </a>
      </footer>
    </div>
  );
}

function buildGoogleMapsUrl(latitude, longitude) {
  return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
}

function buildWazeUrl(latitude, longitude) {
  return `https://www.waze.com/ul?ll=${latitude},${longitude}&navigate=yes`;
}

function buildWhatsappUrl(message) {
  const cleanPhone = WHATSAPP_PHONE.replace(/\D/g, "");
  const encodedMessage = encodeURIComponent(message);

  if (cleanPhone) {
    return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
  }

  return `https://api.whatsapp.com/send?text=${encodedMessage}`;
}
