import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import { useLanguage } from "./LanguageContext.jsx";
import { LandPlot, Smile, Languages, Trophy } from "lucide-react";

// Animates a number from 0 up to `target` once `start` becomes true.
function useCountUp(target, start, duration = 1400) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [start, target, duration]);

  return value;
}

function formatThousands(n) {
  return n.toLocaleString("ru-RU");
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const maydon = useCountUp(4400, loaded, 1500);
  const bola = useCountUp(500, loaded, 1300);
  const til = useCountUp(2, loaded, 800);
  const zona = useCountUp(7, loaded, 1000);

  return (
    <div className="page-top">
      <div className="page-bg">
        <div className="hero-bg" />
        <div className="hero-veil" />
        <div className="hero-glow" />
        <svg className="hero-sparkle" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <circle cx="980" cy="150" r="2.6" />
          <circle cx="1060" cy="280" r="1.8" />
          <circle cx="890" cy="90" r="2" />
          <circle cx="1120" cy="420" r="1.6" />
          <circle cx="940" cy="360" r="2.2" />
        </svg>
      </div>

      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="brand">
          <span className="brand-seal">
            <img className="brand-seal-img" src="/logo.webp" alt="OXU KIDS" />
          </span>
          <a href="/" className="brand-name">
            OXU KIDS
          </a>
        </div>

        <button
          className={`burger ${menuOpen ? "open" : ""}`}
          aria-label="Menyu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li><a href="#about">{t.nav.about}</a></li>
          <li><a href="#travel">{t.nav.travel}</a></li>
          <li><a href="#programs">{t.nav.programs}</a></li>
          <li><a href="#sport">{t.nav.sport}</a></li>
          <li><a href="#gallery">{t.nav.gallery}</a></li>
          <li><a href="#contact">{t.nav.contact}</a></li>
        </ul>

        <div className="nav-actions">
          <div className="lang-switch">
            <button
              className={lang === "uz" ? "active" : ""}
              onClick={() => setLang("uz")}
            >
              UZ
            </button>
            <button
              className={lang === "ru" ? "active" : ""}
              onClick={() => setLang("ru")}
            >
              RU
            </button>
          </div>
          <Link to={"/apply"} className="cta-btn">{t.nav.cta}</Link>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-inner">
          <div className={`hero-text ${loaded ? "is-in" : ""}`}>
            <p className="eyebrow">
              <span className="eyebrow-line" />
              {lang === "uz" ? "Premium xalqaro bog'cha" : "Премиум международный сад"}
            </p>

            <h1 className="headline">
              <span className="headline-row">{t.hero.titleLine1}</span>
              <span className="headline-row headline-accent">
                {t.hero.titleLine2}
                <svg className="headline-underline" viewBox="0 0 320 24" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M4 16 C 90 4, 230 22, 316 8" />
                </svg>
              </span>
            </h1>

            <p className="lede">
              {t.hero.subtitleLine1}
              <br />
              {t.hero.subtitleLine2}
            </p>

            <div className="hero-cta">
              <Link to={"/apply"} className="btn-primary">{t.hero.ctaPrimary}</Link>
              <a href="#travel" className="btn-outline">{t.hero.ctaOutline}</a>
            </div>
          </div>

          <div className={`hero-emblem ${loaded ? "is-in" : ""}`}>
            <div className="stat-panel">

              <div className="highlight-card">
                <span className="highlight-eyebrow">— O X U —</span>
                <span className="highlight-title">Ta'lim</span>
                <span className="highlight-sub">ekotizimi</span>
                <span className="highlight-foot">Osiyo Xalqaro Universitet</span>
              </div>
              <div className="stat-panel-eyebrow">
                {lang === "uz" ? "Raqamlarda OXU KIDS" : "OXU KIDS в цифрах"}
              </div>

              <div className="stat-grid">
                <div className="stat-tile">
                  <div className="stat-tile-icon">
                    <LandPlot size={20} strokeWidth={2.4} />
                  </div>
                  <span className="stat-tile-num">{formatThousands(maydon)}</span>
                  <span className="stat-tile-label">{t.hero.badgeMaydon}</span>
                </div>

                <div className="stat-tile">
                  <div className="stat-tile-icon">
                    <Smile size={20} strokeWidth={2.4} />
                  </div>
                  <span className="stat-tile-num">{bola}+</span>
                  <span className="stat-tile-label">{t.hero.badgeBola}</span>
                </div>

                <div className="stat-tile">
                  <div className="stat-tile-icon">
                    <Languages size={20} strokeWidth={2.4} />
                  </div>
                  <span className="stat-tile-num">{til}</span>
                  <span className="stat-tile-label">{t.hero.badgeTil}</span>
                </div>

                <div className="stat-tile">
                  <div className="stat-tile-icon">
                    <Trophy size={20} strokeWidth={2.4} />
                  </div>
                  <span className="stat-tile-num">{zona}</span>
                  <span className="stat-tile-label">{t.hero.badgeZona}</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="scroll-cue">
          <span className="scroll-cue-text">{t.hero.scroll}</span>
          <span className="scroll-cue-line" />
        </div>
      </header>
    </div>
  );
}