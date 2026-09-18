import "./AqlVaIjod.css";
import { useLanguage } from "./LanguageContext.jsx";

const ChessIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2v3M9 5h6" strokeLinecap="round" />
    <path
      d="M7 9c0-1.7 1.3-3 5-3s5 1.3 5 3l-1.2 9H8.2L7 9z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M8 18h8M6 21h12" strokeLinecap="round" />
  </svg>
);

const TheatreIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path
      d="M4 9c0-3 2-6 8-6s8 3 8 6c0 4-3 5-3 8 0 2-2 3-5 3s-5-1-5-3c0-3-3-4-3-8z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="9" cy="10" r="1" fill="currentColor" stroke="none" />
    <circle cx="15" cy="10" r="1" fill="currentColor" stroke="none" />
    <path d="M9 15c1 1 5 1 6 0" strokeLinecap="round" />
  </svg>
);

const clubImages = ["/DasturlarBg.webp", "/therate.webp"];
const clubAccents = ["#c49f5b", "#e8638a"];
const clubIcons = [<ChessIcon />, <TheatreIcon />];
const clubIds = ["chess", "theatre"];

export default function IntellectualClubs() {
  const { t } = useLanguage();
  const clubs = t.clubs.items.map((club, i) => ({
    ...club,
    id: clubIds[i],
    image: clubImages[i],
    accent: clubAccents[i],
    icon: clubIcons[i],
  }));

  return (
    <section id="clubs" className="clubs-section">
      <div className="clubs-section__header">
        <div className="clubs-section__eyebrow">
          <span className="clubs-section__eyebrow-line" />
          {t.clubs.eyebrow}
        </div>
        <h2 className="clubs-section__heading">
          {t.clubs.headingLine1}
          <span className="clubs-section__heading-accent">{t.clubs.headingLine2}</span>
        </h2>
      </div>

      <div className="clubs-grid">
        {clubs.map((club) => (
          <article
            key={club.id}
            className="club-card"
            tabIndex={0}
            style={{ "--accent": club.accent }}
          >
            <img src={club.image} alt={club.title} className="club-card__bg" />
            <div className="club-card__overlay" />

            <div className="club-card__content">
              <div className="club-card__icon">{club.icon}</div>
              <p className="club-card__label">{club.label}</p>
              <h3 className="club-card__title">{club.title}</h3>
              <p className="club-card__description">{club.description}</p>

              <div className="club-card__divider" />

              <div className="club-card__stats">
                {club.stats.map((stat) => (
                  <div className="club-card__stat" key={stat.caption}>
                    <span className="club-card__stat-value">{stat.value}</span>
                    <span className="club-card__stat-caption">
                      {stat.caption}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
