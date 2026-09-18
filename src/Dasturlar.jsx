import React, { useEffect, useRef, useState } from "react";
import "./Dasturlar.css";
import { Link } from "react-router-dom";
import { useLanguage } from "./LanguageContext.jsx";

const programImages = ["/English.webp", "/Russian.webp", "/Creative.webp", "/restroom.webp"];
const programAccents = ["blue", "red", "teal", "gold"];
const programIds = ["english", "russian", "creative", "rest"];

export default function Dasturlar() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  const programs = t.dasturlar.programs.map((p, i) => ({
    ...p,
    id: programIds[i],
    accent: programAccents[i],
    image: programImages[i],
  }));

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="programs"
      className={`dasturlar ${inView ? "in-view" : ""}`}
      ref={sectionRef}
    >
      <div className="dasturlar__tint" />
      <div className="dasturlar__inner">
        <div className="dasturlar__eyebrow">
          <span className="dasturlar__eyebrow-line" />
          <span>{t.dasturlar.eyebrow}</span>
        </div>

        <h2 className="dasturlar__heading">
          <span className="dasturlar__heading-white">{t.dasturlar.headingWhite}</span>
          <span className="dasturlar__heading-gold">{t.dasturlar.headingGold}</span>
        </h2>

        <div className="dasturlar__grid">
          {programs.map((p, i) => (
            <article
              key={p.id}
              className={`dasturlar__card dasturlar__card--${p.accent}`}
              style={{
                backgroundImage: `url(${p.image})`,
                transitionDelay: `${0.1 + i * 0.12}s`,
              }}
            >
              <div className="dasturlar__card-overlay" />
              <div className="dasturlar__card-content">
                <span className="dasturlar__card-eyebrow">{p.eyebrow}</span>
                <h3 className="dasturlar__card-title">{p.title}</h3>
                <p className="dasturlar__card-desc">{p.description}</p>
                <div className="dasturlar__tags">
                  {p.tags.map((tag) => (
                    <span className="dasturlar__tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="dasturlar__cta-wrap">
          <Link to="/apply" className="dasturlar__cta">
            {t.dasturlar.cta} <span className="dasturlar__cta-arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
