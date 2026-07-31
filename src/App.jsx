import { useEffect, useMemo, useRef, useState, Fragment } from "react";
import ProductCard from "./components/ProductCard.jsx";
import ProductModal from "./components/ProductModal.jsx";
import LanguageGate from "./components/LanguageGate.jsx";
import CartFab from "./components/CartFab.jsx";
import AboutPage from "./components/AboutPage.jsx";
import { menuCategories } from "./menuData.js";
import { translations, localizeCategories } from "./i18n.js";

const MAX_QTY = 50;
const WHATSAPP_PHONE = "50683161336";
const CREATOR_PHONE = "+50688292124";
const CREATOR_INSTAGRAM = "yorzethmc";
const SERVICE_TIME_ZONE = "America/Costa_Rica";
const SERVICE_WINDOWS = {
  Mon: [[11 * 60, 21 * 60]],
  Tue: [[11 * 60, 21 * 60]],
  Wed: [[11 * 60, 21 * 60]],
  Thu: [[11 * 60, 21 * 60]],
  Fri: [[11 * 60, 21 * 60]],
  Sat: [[11 * 60, 21 * 60]]
};
const LANGUAGE_STORAGE_KEY = "el-break-lang";
// El modo Salon queda oculto para los clientes hasta que el dueno del negocio lo habilite aqui.
const ENABLE_SALON_MODE = false;

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
  const [lang, setLang] = useState(() => {
    const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (saved) {
      document.documentElement.lang = saved;
      return saved;
    }
    return null;
  });
  const [view, setView] = useState("menu");
  const [activeCategory, setActiveCategory] = useState("todo");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState(() => {
    try {
      const saved = window.localStorage.getItem("el-break-cart");
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderType, setOrderType] = useState("pickup");
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

  // Theme and Salon mode additions
  const [theme, setTheme] = useState("theme-fast-food");
  const [tableNumber, setTableNumber] = useState("");
  const cartPanelRef = useRef(null);

  const t = translations[lang || "es"];

  useEffect(() => {
    window.localStorage.setItem("el-break-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const interval = window.setInterval(() => setNow(new Date()), 60000);
    return () => window.clearInterval(interval);
  }, []);

  const serviceStatus = useMemo(() => getServiceStatus(now), [now]);

  const localizedCategories = useMemo(() => localizeCategories(menuCategories, lang || "es"), [lang]);

  const localizedMenuItems = useMemo(
    () =>
      localizedCategories.flatMap((category) =>
        category.items.map((item) => ({
          ...item,
          categoryId: category.id,
          categoryName: category.name,
          categoryIcon: category.icon,
          categoryColor: category.color,
          categoryImage: category.image
        }))
      ),
    [localizedCategories]
  );

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return localizedMenuItems.filter((item) => {
      const matchesCategory = activeCategory === "todo" || item.categoryId === activeCategory;
      const optionText = (item.options || []).map((option) => option.name).join(" ");
      const extraText = (item.extras || []).map((extra) => extra.name).join(" ");
      const searchable = `${item.name} ${item.description || ""} ${item.categoryName} ${optionText} ${extraText}`.toLowerCase();
      return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [localizedMenuItems, activeCategory, query]);

  const cartItems = cart;

  const cartTotal = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  function selectLanguage(code) {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, code);
    setLang(code);
    document.documentElement.lang = code;
  }

  function scrollToCart() {
    cartPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

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
      nextErrors.push(t.errorServiceClosed);
    }

    if (cartItems.length === 0) {
      nextErrors.push(t.errorEmptyCart);
    }

    if (!customerName.trim()) {
      nextErrors.push(t.errorName);
    }

    if (orderType === "express" && !address.trim()) {
      nextErrors.push(t.errorAddress);
    }

    if (orderType === "salon" && !tableNumber.trim()) {
      nextErrors.push(t.errorTable);
    }

    if (orderType === "express" && paymentMethod === "efectivo" && !cashAmount.trim()) {
      nextErrors.push(t.errorCash);
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
      message: t.confirmationMessage
    });
    setCart([]);
    setCustomerName("");
    setAddress("");
    setCashAmount("");
    setTableNumber("");
    setLocation(null);
    setLocationStatus("");
    setLocationError("");
    setErrors([]);
  }

  function requestLocation() {
    setLocationError("");
    setLocationStatus("");

    if (!navigator.geolocation) {
      setLocationError(t.locationUnsupported);
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
        setLocationStatus(t.locationReady);
        setIsLocating(false);
      },
      (error) => {
        const errorMessages = {
          1: t.locationError1,
          2: t.locationError2,
          3: t.locationError3
        };
        setLocationError(errorMessages[error.code] || t.locationErrorDefault);
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

  // El mensaje de WhatsApp siempre se envia en espanol: lo recibe el personal del local, no el cliente.
  function buildWhatsappMessage() {
    const isExpress = orderType === "express";
    const isSalon = orderType === "salon";
    const title = isSalon ? `*MESA ${tableNumber.trim()} - NUEVO PEDIDO*` : "*NUEVO PEDIDO - Pizzeria El Break*";

    let tipo = "Para llevar";
    if (isExpress) tipo = "Express";
    if (isSalon) tipo = "En Salon";

    const lines = [
      title,
      "------------------------------",
      "",
      `*Tipo:* ${tipo}`,
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
        lines.push(`  Extras: ${item.extras.map((extra) => `${extra.qty > 1 ? extra.qty + 'x ' : ''}${extra.name}`).join(", ")}`);
      }
      lines.push(`  Subtotal: ${formatPrice(item.subtotal)}`);
    });

    lines.push("------------------------------");
    lines.push(isExpress ? `*Total sin express:* ${formatPrice(cartTotal)}` : `*Total:* ${formatPrice(cartTotal)}`);
    lines.push("");
    lines.push("Gracias.");

    return lines.join("\n");
  }

  return (
    <div className={`app ${theme}`}>
      {!lang && <LanguageGate onSelect={selectLanguage} />}

      <header className="hero">
        <div className="hero__content">
          <div className="brand">
            <span className="brand__mark">
              <img src={`${import.meta.env.BASE_URL}assets/menu/elBreakLogo.jpg`} alt="Pizzeria El Break" />
            </span>
            <div>
              <p className="eyebrow">{t.tagline}</p>
              <h1>Pizzeria El Break</h1>
            </div>
          </div>

          <div className="language-toggle" role="group" aria-label={t.changeLanguage}>
            <button type="button" className={lang === "es" || !lang ? "is-active" : ""} onClick={() => selectLanguage("es")}>
              ES
            </button>
            <button type="button" className={lang === "en" ? "is-active" : ""} onClick={() => selectLanguage("en")}>
              EN
            </button>
            <button type="button" className={lang === "pt" ? "is-active" : ""} onClick={() => selectLanguage("pt")}>
              PT
            </button>
          </div>

          <div className="hero__summary">
            <span>{localizedMenuItems.length} {t.optionsCount}</span>
            <strong>{formatPrice(cartTotal)}</strong>
          </div>
        </div>
      </header>

      {view === "menu" && (
        <div className="about-teaser">
          <button type="button" className="about-teaser__button" onClick={() => setView("about")}>
            <span className="about-teaser__icon" aria-hidden="true">📖</span>
            {t.about.linkLabel}
          </button>
        </div>
      )}

      {view === "about" ? (
        <AboutPage
          t={t}
          schedule={t.schedule}
          whatsappUrl={buildWhatsappUrl(t.about.followUs)}
          onBack={() => setView("menu")}
        />
      ) : (
      <main className="menu-layout">
          <section className="menu-main" aria-labelledby="menu-title">
            <div className="tool-row">
              <div>
                <p className="eyebrow">{t.artisanEyebrow}</p>
                <h2 id="menu-title">{t.chooseOrder}</h2>
              </div>

              <label className="search-box">
                <span>{t.search}</span>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={t.searchPlaceholder}
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
                {t.all}
              </button>
              {localizedCategories.map((category) => (
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

            <div className="menu-grid">
              {filteredItems.length > 0 ? (
                (() => {
                  let currentSection = null;
                  return filteredItems.map((item) => {
                    const sectionHeading = item.section && item.section !== currentSection ? (
                      <div className="section-heading" key={`sec-${item.section}`} style={{ gridColumn: "1 / -1", marginTop: "1rem" }}>
                        <h3 style={{ margin: 0, paddingBottom: "8px", borderBottom: "2px solid var(--ink)" }}>
                          {item.section}
                        </h3>
                      </div>
                    ) : null;
                    currentSection = item.section || currentSection;
                    
                    return (
                      <Fragment key={item.id}>
                        {sectionHeading}
                        <ProductCard
                          product={item}
                          formatPrice={formatPrice}
                          t={t}
                          onConfigure={() => setSelectedProduct(item)}
                        />
                      </Fragment>
                    );
                  });
                })()
              ) : (
                <div className="empty-state">
                  {t.noResults}
                </div>
              )}
            </div>
          </section>

          <aside className="cart-panel" aria-label="Resumen del pedido" ref={cartPanelRef}>
            <div className="cart-panel__head">
              <div>
                <p className="eyebrow">{t.orderEyebrow}</p>
                <h2>{t.summary}</h2>
              </div>
              <span className="cart-badge">{itemCount}</span>
            </div>

            {cartItems.length > 0 ? (
              <ul className="cart-list">
                {cartItems.map((item) => (
                  <li key={item.cartId} className="cart-line">
                    <div>
                      <strong>{item.name}</strong>
                      <span>{item.quantity} x {item.option.name}</span>
                      {item.extras.length > 0 && (
                        <span>{t.extrasLabel}: {item.extras.map((extra) => `${extra.qty > 1 ? extra.qty + 'x ' : ''}${extra.name}`).join(", ")}</span>
                      )}
                    </div>
                    <div className="cart-line__actions">
                      <b>{formatPrice(item.subtotal)}</b>
                      <button type="button" onClick={() => removeCartItem(item.cartId)}>
                        {t.remove}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty-state">{t.emptyCart}</p>
            )}

            <div className="total-row">
              <span>{orderType === "express" ? t.totalNoExpress : t.total}</span>
              <strong>{formatPrice(cartTotal)}</strong>
            </div>
            {orderType === "express" && (
              <p className="total-note">{t.totalNote}</p>
            )}

            <div className={`service-card ${serviceStatus.isOpen ? "service-card--open" : "service-card--closed"}`}>
              <strong>{serviceStatus.isOpen ? t.serviceOpen : t.serviceClosed}</strong>
              <p>{t.schedule}</p>
              {!serviceStatus.isOpen && <p>{t.serviceClosedNote}</p>}
            </div>

            <form className="checkout-form" onSubmit={submitOrder}>
              <div className="mode-box">
                <span>{t.orderType}</span>
                <div
                  className="mode-switch"
                  role="radiogroup"
                  aria-label={t.orderType}
                  style={{ gridTemplateColumns: `repeat(${ENABLE_SALON_MODE ? 3 : 2}, 1fr)` }}
                >
                  <button
                    className={orderType === "express" ? "is-active" : ""}
                    type="button"
                    onClick={() => setOrderType("express")}
                  >
                    {t.express}
                  </button>
                  <button
                    className={orderType === "pickup" ? "is-active" : ""}
                    type="button"
                    onClick={() => {
                      setOrderType("pickup");
                      clearLocation();
                    }}
                  >
                    {t.pickup}
                  </button>
                  {ENABLE_SALON_MODE && (
                    <button
                      className={orderType === "salon" ? "is-active" : ""}
                      type="button"
                      onClick={() => {
                        setOrderType("salon");
                        clearLocation();
                      }}
                    >
                      {t.salon}
                    </button>
                  )}
                </div>
              </div>

              <label>
                {t.fullName}
                <input value={customerName} onChange={(event) => setCustomerName(event.target.value)} />
              </label>

              {orderType === "express" && (
                <>
                  <label>
                    {t.deliveryAddress}
                    <textarea value={address} onChange={(event) => setAddress(event.target.value)} />
                  </label>

                  <div className="payment-box">
                    <span>{t.paymentMethod}</span>
                    <div className="payment-options" role="radiogroup" aria-label={t.paymentMethod}>
                      <button
                        className={paymentMethod === "sinpe" ? "is-active" : ""}
                        type="button"
                        onClick={() => setPaymentMethod("sinpe")}
                      >
                        {t.sinpe}
                      </button>
                      <button
                        className={paymentMethod === "efectivo" ? "is-active" : ""}
                        type="button"
                        onClick={() => setPaymentMethod("efectivo")}
                      >
                        {t.cash}
                      </button>
                    </div>
                  </div>

                  {paymentMethod === "efectivo" && (
                    <label>
                      {t.cashAmount}
                      <input
                        value={cashAmount}
                        onChange={(event) => setCashAmount(event.target.value)}
                        placeholder={t.cashPlaceholder}
                      />
                    </label>
                  )}

                  <div className="location-box">
                    <div className="location-copy">
                      <strong>{t.gpsTitle}</strong>
                      <p>{t.gpsDescription}</p>
                    </div>
                    <div className="location-actions">
                      <button className="location-button" type="button" onClick={requestLocation} disabled={isLocating}>
                        <span aria-hidden="true">📍</span>
                        <strong>{isLocating ? t.locating : t.shareLocation}</strong>
                        <small>{t.locationHint}</small>
                      </button>
                      {location && (
                        <button className="ghost-button" type="button" onClick={clearLocation}>
                          {t.removeLocation}
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

              {ENABLE_SALON_MODE && orderType === "salon" && (
                <label>
                  {t.tableNumber}
                  <input
                    value={tableNumber}
                    onChange={(event) => setTableNumber(event.target.value)}
                    placeholder={t.tablePlaceholder}
                  />
                </label>
              )}

              {errors.length > 0 && (
                <div className="alert alert--error" role="alert">
                  {errors.map((error) => (
                    <p key={error}>{error}</p>
                  ))}
                </div>
              )}

              <button className="primary-button" type="submit" disabled={!serviceStatus.isOpen}>
                {serviceStatus.isOpen ? t.submitOrder : t.outsideHours}
              </button>
            </form>

            {confirmation && (
              <div className="alert alert--success">
                <strong>{confirmation.message}</strong>
                <p>{t.confirmationTotal}: {formatPrice(confirmation.total)}</p>
              </div>
            )}
          </aside>
      </main>
      )}

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          formatPrice={formatPrice}
          maxQuantity={MAX_QTY}
          onClose={() => setSelectedProduct(null)}
          addToCart={addToCart}
          whatsappUrl={buildWhatsappUrl(`Hola, quiero consultar el precio de: ${selectedProduct.name}`)}
          t={t}
        />
      )}

      {view === "menu" && <CartFab itemCount={itemCount} label={t.floatingCheckout} onClick={scrollToCart} />}

      <footer className="site-footer">
        <div style={{ marginBottom: "20px", display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
          <button className={`secondary-button ${theme === "theme-fast-food" ? "is-active" : ""}`} onClick={() => setTheme("theme-fast-food")}>🎨 {t.themeFastFood}</button>
          <button className={`secondary-button ${theme === "theme-luxury" ? "is-active" : ""}`} onClick={() => setTheme("theme-luxury")}>🍷 {t.themeLuxury}</button>
          <button className={`secondary-button ${theme === "theme-classic" ? "is-active" : ""}`} onClick={() => setTheme("theme-classic")}>☕ {t.themeClassic}</button>
        </div>
        <span>✨ Created by Erick Yorzeth Masis Cavero ✨</span>
        <div className="footer-links">
          <a href={`https://wa.me/${CREATOR_PHONE.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">
            💬 WhatsApp: {CREATOR_PHONE}
          </a>
          <a href={`https://www.instagram.com/${CREATOR_INSTAGRAM}/`} target="_blank" rel="noreferrer">
            📸 Instagram: @{CREATOR_INSTAGRAM}
          </a>
        </div>
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
