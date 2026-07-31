const LOCATION_MAPS_URL = "https://www.google.com/maps/search/?api=1&query=10.006927,-84.217977";
const INSTAGRAM_HANDLE = "elbreakpizzeria";
const FACEBOOK_HANDLE = "Elbreakpizzeriaoficial";
const TIKTOK_HANDLE = "breakpizzeria";
const BUSINESS_PHONE = "+506 2430-9300";

export default function AboutPage({ t, schedule, whatsappUrl, onBack }) {
  const about = t.about;

  return (
    <div className="about-page">
      <div className="about-page__head">
        <button type="button" className="ghost-button" onClick={onBack}>
          ← {about.backToMenu}
        </button>
      </div>

      <div className="about-hero">
        <img src={`${import.meta.env.BASE_URL}assets/menu/elBreakLogo.jpg`} alt="Pizzeria El Break" />
        <div>
          <h1>Pizzeria El Break</h1>
          <p>{about.heroTagline}</p>
        </div>
      </div>

      <section className="about-section">
        <h2>{about.historyTitle}</h2>
        <p>{about.historyText}</p>
      </section>

      <section className="about-section">
        <h2>{about.sauceTitle}</h2>
        <ul className="about-list">
          {about.sauceClaims.map((claim) => (
            <li key={claim}>{claim}</li>
          ))}
        </ul>
      </section>

      <div className="about-grid">
        <section className="about-card">
          <h3>{about.locationTitle}</h3>
          <p>{about.locationText}</p>
          <a href={LOCATION_MAPS_URL} target="_blank" rel="noreferrer" className="ghost-button">
            {about.viewMap}
          </a>
        </section>

        <section className="about-card">
          <h3>{about.hoursTitle}</h3>
          <p>{schedule}</p>
        </section>

        <section className="about-card">
          <h3>{about.amenitiesTitle}</h3>
          <ul className="about-list">
            {about.amenities.map((amenity) => (
              <li key={amenity}>{amenity}</li>
            ))}
          </ul>
        </section>

        <section className="about-card">
          <h3>{about.paymentTitle}</h3>
          <ul className="about-list">
            {about.payments.map((payment) => (
              <li key={payment}>{payment}</li>
            ))}
          </ul>
        </section>
      </div>

      <section className="about-section about-section--partner">
        <h2>{about.partnerTitle}</h2>
        <p>{about.partnerText}</p>
      </section>

      <section className="about-section">
        <h2>{about.contactTitle}</h2>
        <p>{about.followUs}</p>
        <div className="about-contact-links">
          <a href={whatsappUrl} target="_blank" rel="noreferrer">💬 WhatsApp</a>
          <a href={`tel:${BUSINESS_PHONE.replace(/\D/g, "")}`}>📞 {BUSINESS_PHONE}</a>
          <a href={`https://www.instagram.com/${INSTAGRAM_HANDLE}/`} target="_blank" rel="noreferrer">📸 Instagram</a>
          <a href={`https://www.facebook.com/${FACEBOOK_HANDLE}/`} target="_blank" rel="noreferrer">👍 Facebook</a>
          <a href={`https://www.tiktok.com/@${TIKTOK_HANDLE}`} target="_blank" rel="noreferrer">🎵 TikTok</a>
        </div>
      </section>

      <button type="button" className="primary-button about-cta" onClick={onBack}>
        {about.ctaBack}
      </button>
    </div>
  );
}
