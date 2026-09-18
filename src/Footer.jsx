import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Mail, Clock, ChevronRight, ArrowUp } from 'lucide-react';
import './Footer.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faTelegram, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { useLanguage } from "./LanguageContext.jsx";

const CastleIcon = () => (
  <svg width="20" height="18" viewBox="0 0 24 20" fill="none" aria-hidden="true">
    <path
      d="M3 20V9h4V6h2V4h6v2h2v3h4v11H3z"
      stroke="var(--gold)"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  </svg>
);

const OrnamentRule = () => (
  <div className="ornament-rule" aria-hidden="true">
    <span /><span /><span className="dot-big" /><span /><span />
  </div>
);

const CastleBanner = ({ variant, children }) => {
  const gradId = `bannerCastleFill-${variant}`;
  return (
    <div className={`banner-plaque banner-plaque--${variant}`}>
      <div className="banner-hanger" aria-hidden="true">
        <span className="hanger-rod" />
        <span className="hanger-chain hanger-chain--l" />
        <span className="hanger-chain hanger-chain--m" />
        <span className="hanger-chain hanger-chain--r" />
      </div>
      <svg
        className="banner-plaque-svg"
        viewBox="0 0 200 260"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22368a" />
            <stop offset="45%" stopColor="#16244f" />
            <stop offset="100%" stopColor="#0d1c46" />
          </linearGradient>
        </defs>
        <path
          className="banner-plaque-path"
          fill={`url(#${gradId})`}
          d="M6 6 H194 V168 L168 250 L100 202 L32 250 L6 168 Z"
        />
        <path
          className="banner-plaque-inner"
          d="M15 15 H185 V163 L165 232 L100 191 L35 232 L15 163 Z"
        />
        <circle className="banner-plaque-ring" cx="30" cy="6" r="5" />
        <circle className="banner-plaque-ring" cx="100" cy="6" r="5" />
        <circle className="banner-plaque-ring" cx="170" cy="6" r="5" />
      </svg>
      <div className="banner-plaque-content">{children}</div>
    </div>
  );
};

const Footer = () => {
  const { t } = useLanguage();
  const footerRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={`footer ${inView ? 'in-view' : ''}`} ref={footerRef}>

      <div className="castle-wall" aria-hidden="true">
        <svg className="castle-wall-svg castle-wall-svg--desktop" viewBox="0 0 1600 84" preserveAspectRatio="none">
          <defs>
            <pattern id="merlon" width="88" height="84" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="88" height="84" fill="#f8f3e3" />
              <path d="M0,84 L0,41 L20,41 L20,3 L68,3 L68,41 L88,41 L88,84" fill="#0c1a42" stroke="rgba(240,180,41,0.5)" strokeWidth="2" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="1600" height="84" fill="url(#merlon)" />
        </svg>

        <svg className="castle-wall-svg castle-wall-svg--tablet" viewBox="0 0 900 84" preserveAspectRatio="none">
          <defs>
            <pattern id="merlon-tablet" width="88" height="84" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="88" height="84" fill="#f8f3e3" />
              <path d="M0,84 L0,41 L20,41 L20,3 L68,3 L68,41 L88,41 L88,84" fill="#0c1a42" stroke="rgba(240,180,41,0.5)" strokeWidth="2" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="900" height="84" fill="url(#merlon-tablet)" />
        </svg>

        <svg className="castle-wall-svg castle-wall-svg--mobile" viewBox="0 0 480 84" preserveAspectRatio="none">
          <defs>
            <pattern id="merlon-mobile" width="88" height="84" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="88" height="84" fill="#f8f3e3" />
              <path d="M0,84 L0,41 L20,41 L20,3 L68,3 L68,41 L88,41 L88,84" fill="#0c1a42" stroke="rgba(240,180,41,0.5)" strokeWidth="2" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="480" height="84" fill="url(#merlon-mobile)" />
        </svg>

        {['left', 'right'].map((side) => (
          <div className={`castle-tower castle-tower--${side}`} key={side}>
            <div className="tower-flag">
              <span className="flag-pole" />
              <span className="flag-cloth" />
            </div>
            <svg className="tower-cap" viewBox="0 0 180 46" preserveAspectRatio="none">
              <defs>
                <linearGradient id={`towerCapGrad-${side}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22368a" />
                  <stop offset="100%" stopColor="#0d1c46" />
                </linearGradient>
              </defs>
              <path
                className="tower-cap-path"
                d="M0,46 L0,20 L15,20 L15,5 Q15,2 18,2 L42,2 Q45,2 45,5 L45,20 L60,20 L60,5 Q60,2 63,2 L87,2 Q90,2 90,5 L90,20 L105,20 L105,5 Q105,2 108,2 L132,2 Q135,2 135,5 L135,20 L150,20 L150,5 Q150,2 153,2 L177,2 Q180,2 180,5 L180,46 Z"
                fill={`url(#towerCapGrad-${side})`}
                stroke="rgba(240,180,41,0.7)"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <circle className="tower-cap-dot" cx="30" cy="3" r="2.8" />
              <circle className="tower-cap-dot" cx="75" cy="3" r="2.8" />
              <circle className="tower-cap-dot" cx="120" cy="3" r="2.8" />
              <circle className="tower-cap-dot" cx="165" cy="3" r="2.8" />
            </svg>
            <div className="tower-body">
              <div className="tower-window" />
              <span className="tower-band" aria-hidden="true" />
              <div className="tower-slit" aria-hidden="true" />
            </div>
          </div>
        ))}

        <svg className="paper-plane paper-plane--sky" viewBox="0 0 60 40" aria-hidden="true">
          <path className="plane-trail" d="M2 34 Q 28 24 56 6" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.4" strokeDasharray="1 5" strokeLinecap="round" />
          <path d="M56 6 L38 10 L44 16 Z M56 6 L38 10 L34 2 Z" fill="rgba(255,255,255,0.85)" stroke="rgba(255,255,255,0.9)" strokeWidth="0.6" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="footer-clouds" aria-hidden="true">
        <span className="fc-blur" />
        <span className="fc-cloud fc-cloud--1" />
        <span className="fc-cloud fc-cloud--2" />
        <span className="fc-star fc-star--1">✦</span>
        <span className="fc-star fc-star--2">✦</span>
        <span className="fc-star fc-star--3">✦</span>
        <span className="fc-star fc-star--4">✦</span>
      </div>

      <svg className="corner-sketch corner-sketch--left" viewBox="0 0 220 140" aria-hidden="true">
        <g fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="46" cy="30" r="9" />
          <circle cx="70" cy="30" r="9" />
          <circle cx="58" cy="52" r="26" />
          <circle cx="46" cy="46" r="4" />
          <circle cx="70" cy="46" r="4" />
          <path d="M50 58 Q58 64 66 58" />
          <ellipse cx="30" cy="86" rx="13" ry="18" />
          <ellipse cx="86" cy="86" rx="13" ry="18" />
          <ellipse cx="58" cy="100" rx="30" ry="26" />
          <ellipse cx="30" cy="118" rx="10" ry="12" />
          <ellipse cx="86" cy="118" rx="10" ry="12" />
        </g>
        <g fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.6" strokeLinejoin="round">
          <path d="M140 40 L200 20 L150 66 L142 50 Z" />
          <path d="M150 66 L162 54 L142 50" />
        </g>
      </svg>

      <svg className="corner-sketch corner-sketch--right" viewBox="0 0 220 140" aria-hidden="true">
        <g fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <line x1="150" y1="20" x2="150" y2="120" />
          <line x1="200" y1="20" x2="200" y2="120" />
          <line x1="148" y1="20" x2="202" y2="20" />
          <line x1="163" y1="20" x2="158" y2="72" />
          <line x1="187" y1="20" x2="192" y2="72" />
          <rect x="156" y="72" width="38" height="8" rx="3" />
          <circle cx="40" cy="96" r="20" />
          <path d="M22 96 Q40 106 58 96 M40 76 L40 116 M26 84 Q40 96 54 108" />
        </g>
      </svg>

      <div className="footer-container">
        <div className="footer-grid">

          <div className="footer-col footer-brand">
            <CastleBanner variant="brand">
              <img src="/logo.webp" alt="OXU KIDS Logo" className="footer-logo" />
              <h2 className="brand-title">OXU <span>KIDS</span></h2>
              <p className="brand-tagline">{t.footer.brandDesc}</p>
            </CastleBanner>
          </div>

          <div className="footer-links-contact-wrap">

            <svg className="archway-gate" viewBox="0 0 400 460" preserveAspectRatio="none" aria-hidden="true">
              <path
                className="archway-gate-path"
                d="
                  M18 460
                  L18 250
                  C18 150 55 90 120 62
                  L182 30
                  L200 14
                  L218 30
                  L280 62
                  C345 90 382 150 382 250
                  L382 460
                "
              />
            </svg>

            <div className="footer-col footer-links">
              <span className="icon-badge"><CastleIcon /></span>
              <h3 className="section-title">
                {t.footer.pagesTitle}
              </h3>
              <OrnamentRule />
              <ul>
                <li><a href="#about"><ChevronRight size={14} />{t.footer.links.about}</a></li>
                <li><a href="#programs"><ChevronRight size={14} />{t.footer.links.programs}</a></li>
                <li><a href="#sport"><ChevronRight size={14} />{t.footer.links.sport}</a></li>
                <li><a href="#clubs"><ChevronRight size={14} />{t.footer.links.clubs}</a></li>
                <li><a href="#gallery"><ChevronRight size={14} />{t.footer.links.gallery}</a></li>
                <li><a href="#security"><ChevronRight size={14} />{t.footer.links.security}</a></li>
                <li><a href="#contact"><ChevronRight size={14} />{t.footer.links.contact}</a></li>
              </ul>
            </div>

            <div className="footer-col footer-contact">
              <span className="icon-badge"><MapPin strokeWidth={1.75} size={18} /></span>
              <h3 className="section-title">
                {t.footer.contactTitle}
              </h3>
              <OrnamentRule />
              <div className="contact-info">
                <p><span className="icon"><MapPin strokeWidth={1.75} size={15} /></span>{t.footer.address}</p>
                <p><span className="icon"><Phone strokeWidth={1.75} size={15} /></span>+998 55 310 10 10</p>
                <p><span className="icon"><Mail strokeWidth={1.75} size={15} /></span>info@oxukids.uz</p>
                <p className="contact-hours"><span className="icon"><Clock strokeWidth={1.75} size={15} /></span>
                  <span>{t.footer.workDays || "Dushanba - Shanba"}<br />{t.footer.workHours || "08:00 - 17:00"}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="footer-col footer-social">
            <CastleBanner variant="social">
              <h3 className="section-title section-title--wide">
                {t.footer.socialTitle || "Bizni ijtimoiy tarmoqlarda kuzating"}
              </h3>
              <OrnamentRule />
              <div className="social-icons">
                <a href="#instagram" className="social-icon" aria-label="Instagram">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href="#telegram" className="social-icon" aria-label="Telegram">
                  <FontAwesomeIcon icon={faTelegram} />
                </a>
                <a href="#youtube" className="social-icon" aria-label="YouTube">
                  <FontAwesomeIcon icon={faYoutube} />
                </a>
              </div>
            </CastleBanner>
          </div>

        </div>

        <div className="footer-divider">
          <span className="divider-line" />
          <span className="divider-crest">
            <img src="/logo.webp" alt="" />
          </span>
          <span className="divider-line" />
        </div>

        <div className="footer-bottom">
          <p>{t.footer.copyright}</p>
          <p>{t.footer.ecosystem}</p>
        </div>
      </div>

      <button className="footer-top-btn" onClick={scrollToTop} aria-label="Yuqoriga">
        <ArrowUp size={18} />
      </button>
    </footer>
  );
};

export default Footer;