import React, { useEffect, useRef, useState } from "react";
import { Star, User, ArrowLeft, ArrowRight } from "lucide-react";
import "./Comments.css";
import { useLanguage } from "./LanguageContext.jsx";

const accents = ["#b3cfea", "#c49f5b", "#8fb896", "#f2d479"];
const avatarBgs = ["#e4eef8", "#f3e9d6", "#e5efe6", "#fbf3d9"];
const badgeBgs = ["#f3f7fc", "#f7f2ea", "#f0f5f1", "#fdf9ee"];

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

export default function Testimonials() {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);

  const TESTIMONIALS = t.comments.items.map((item, i) => ({
    ...item,
    accent: accents[i],
    avatarBg: avatarBgs[i],
    badgeBg: badgeBgs[i],
  }));

  const total = TESTIMONIALS.length;

  const [headerRef, headerVisible] = useReveal();
  const [carouselRef, carouselVisible] = useReveal();
  const [controlsRef, controlsVisible] = useReveal();

  const goTo = (i) => setIndex((i + total) % total);
  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  return (
    <div className="test-root">
      <div className="test-inner">
        <div
          ref={headerRef}
          className={`test-header ${headerVisible ? "test-in-view" : ""}`}
        >
          <div>
            <div className="test-eyebrow">{t.comments.eyebrow}</div>
            <h2 className="test-title">
              {t.comments.titleLine1}
              <span className="gold">{t.comments.titleGold}</span>
            </h2>
          </div>

          <div className="test-rating">
            <span className="test-rating-score">5.0</span>
            <div>
              <div className="test-rating-stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <div className="test-rating-label">{t.comments.ratingLabel}</div>
            </div>
          </div>
        </div>

        <div
          ref={carouselRef}
          className={`test-carousel ${carouselVisible ? "test-in-view" : ""}`}
        >
          <div
            className="test-track"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {TESTIMONIALS.map((t2) => (
              <div className="test-slide" key={t2.name}>
                <div className="test-card" style={{ "--accent": t2.accent }}>
                  <span className="test-quote-mark">&rdquo;</span>

                  <div
                    className="test-avatar"
                    style={{ "--accent": t2.accent, background: t2.avatarBg }}
                  >
                    <User strokeWidth={1.75} />
                  </div>

                  <div className="test-content">
                    <p className="test-quote">&ldquo;{t2.quote}&rdquo;</p>
                    <h4 className="test-name">{t2.name}</h4>
                    <div className="test-role">{t2.role}</div>
                    <div className="test-stars">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} fill="currentColor" strokeWidth={0} />
                      ))}
                    </div>
                    <div className="test-badge-row">
                      <span
                        className="test-badge"
                        style={{
                          "--accent": t2.accent,
                          "--badge-bg": t2.badgeBg,
                        }}
                      >
                        {t2.badge}
                      </span>
                      <span className="test-since">{t2.since}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={controlsRef}
          className={`test-controls ${controlsVisible ? "test-in-view" : ""}`}
        >
          <div className="test-arrows">
            <button className="test-arrow-btn" onClick={prev} aria-label={t.comments.prevLabel}>
              <ArrowLeft size={18} />
            </button>
            <button className="test-arrow-btn" onClick={next} aria-label={t.comments.nextLabel}>
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="test-dots">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                className={`test-dot ${i === index ? "active" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`${i + 1}`}
              />
            ))}
          </div>

          <div className="test-counter">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </div>
        </div>
      </div>
    </div>
  );
}
