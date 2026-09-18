import React, { useEffect, useRef, useState } from "react";
import './AboutSection.css'
import { useLanguage } from "./LanguageContext.jsx";
import { Smile, LandPlot, Languages, ShieldCheck } from "lucide-react";

const tourImages = ["/mainhall.webp", "/playroom.webp", "/pool.webp", "/gym.webp", "/tuzlixona.webp", "/restroom.webp", "/kiyinishxonasi.webp"];
const tourNums = ["01", "02", "03", "04", "05", "06", "07"];
const tourColors = ["gold", "pink", "blue", "green", "gold", "gold", "pink"];
const tourExtras = [3, 0, 1, 3, 0, 1, 0];

const tourGalleries = [
  ["/mainhall.webp",      "/gallaryimages/asosiy-zal-2.webp",      "/gallaryimages/asosiy-zal-3.webp",      "/gallaryimages/asosiy-zal-4.webp"],
  ["/playroom.webp",      "/gallaryimages/oyin-xonasi-2.webp",      "/gallaryimages/oyin-xonasi-3.webp",      "/gallaryimages/oyin-xonasi-4.webp"],
  ["/pool.webp",          "/gallaryimages/basseyn-2.webp",          "/gallaryimages/basseyn-3.webp",          "/gallaryimages/basseyn-4.webp"],
  ["/gym.webp",           "/gym-2.webp",           "/gym-3.webp",           "/gym-4.webp"],
  ["/tuzlixona.webp",     "/gallaryimages/gimnastika-zali-2.webp",     "/gallaryimages/gimnastika-zali-3.webp",     "/gallaryimages/gimnastika-zali-4.webp"],
  ["/restroom.webp",      "/gallaryimages/dam-olish-xonasi-2.webp",      "/gallaryimages/dam-olish-xonasi-3.webp",      "/gallaryimages/dam-olish-xonasi-4.webp"],
  ["/kiyinishxonasi.webp","/gallaryimages/kiyinish-xonasi-2.webp","/gallaryimages/kiyinish-xonasi-3.webp","/gallaryimages/kiyinish-xonasi-4.webp"],
];

const featureIcons = {
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 3 1 9l11 6 9-4.9V17h2V9L12 3Z" />
      <path d="M5 13.18v4.5C5 19.5 8.13 21 12 21s7-1.5 7-3.32v-4.5" />
    </svg>
  ),
  food: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
  ),
  safety: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  sport: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="m3 17 6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </svg>
  ),
};

function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

function useCountUp(target, start, duration = 1200) {
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

function StatNumber({ raw, start }) {
  const text = String(raw ?? "");
  const match = text.match(/^\d+/);
  const target = match ? parseInt(match[0], 10) : 0;
  const value = useCountUp(target, start && !!match, 1100);

  if (!match) return <>{text}</>;
  return <>{value}{text.slice(match[0].length)}</>;
}

export default function AboutSection() {
  const { t } = useLanguage();
  const [sectionRef, inView] = useInView(0.25);
  const [missionRef, missionInView] = useInView(0.2);
  const [cardsRef, cardsInView] = useInView(0.25);
  const [tourHeaderRef, tourHeaderInView] = useInView(0.3);
  const [tourTrackRef, tourTrackInView] = useInView(0.15);

  const trackRef = useRef(null);

  const [activeThumb, setActiveThumb] = useState(tourImages.map(() => 0));
  const [activeDot, setActiveDot] = useState(0);
  const [scrollRatio, setScrollRatio] = useState(0);

  // qaysi rasm oxirgi marta hover qilingan bo'lsa, o'sha "front"da qolib ketadi
  const [galleryFront, setGalleryFront] = useState("bottom");

  const tourData = t.tour.cards.map((card, i) => ({
    ...card,
    num: tourNums[i],
    badgeColor: tourColors[i],
    img: tourImages[i],
    gallery: tourGalleries[i],
    extra: tourExtras[i],
  }));

  const selectThumb = (panelIndex, thumbIndex) => {
    setActiveThumb((prev) => {
      const next = [...prev];
      next[panelIndex] = thumbIndex;
      return next;
    });
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const onWheel = (e) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;

      const atStart = el.scrollLeft <= 0;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;

      if ((e.deltaY < 0 && atStart) || (e.deltaY > 0 && atEnd)) return;

      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let startScroll = 0;
    let moved = false;

    const onDown = (e) => {
      isDown = true;
      moved = false;
      startX = e.pageX;
      startScroll = el.scrollLeft;
      el.classList.add("dragging");
    };
    const onMove = (e) => {
      if (!isDown) return;
      const dx = e.pageX - startX;
      if (Math.abs(dx) > 4) moved = true;
      el.scrollLeft = startScroll - dx;
    };
    const endDrag = () => {
      isDown = false;
      el.classList.remove("dragging");
    };
    const onClickCapture = (e) => {
      if (moved) {
        e.stopPropagation();
        e.preventDefault();
      }
    };

    el.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", endDrag);
    el.addEventListener("click", onClickCapture, true);

    return () => {
      el.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", endDrag);
      el.removeEventListener("click", onClickCapture, true);
    };
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      const ratio = max > 0 ? el.scrollLeft / max : 0;
      const idx = Math.round(ratio * (tourImages.length - 1));
      setActiveDot(idx);
      setScrollRatio(ratio);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollByPanel = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const panel = el.querySelector(".tour-panel");
    const step = panel ? panel.getBoundingClientRect().width + 18 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const scrollToPanel = (idx) => {
    const el = trackRef.current;
    if (!el) return;
    const panel = el.querySelectorAll(".tour-panel")[idx];
    if (panel) panel.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  const cardIcons = [Smile, LandPlot, Languages, ShieldCheck];

  return (
    <>
      <section id="about" className="about-section" ref={sectionRef}>
        <div className={`about-container ${inView ? "in-view" : ""}`}>

          <div className="about-header">
            <div className="about-eyebrow">
              <span className="about-dot-pulse"></span>
              {t.about.eyebrow}
            </div>
            <h2 className="about-title">
              {t.about.titleLine1}<span className="about-dott"></span>
              <br />
              <span className="about-title-gold">{t.about.titleLine2}</span>
            </h2>
          </div>

          <div className="about-gallery">
            <div
              className={`gallery-item gallery-left ${galleryFront === "left" ? "gallery-item--front" : ""}`}
              onMouseEnter={() => setGalleryFront("left")}
            >
              <img src="/mainhall.webp" alt="Galereya" />
              <div className="gallery-badge">
                <span className="gallery-badge-num">{tourImages.length}</span>
                <span className="gallery-badge-label">maxsus<br />zona</span>
              </div>
            </div>

            <div
              className={`gallery-item gallery-top ${galleryFront === "top" ? "gallery-item--front" : ""}`}
              onMouseEnter={() => setGalleryFront("top")}
            >
              <img src="/playroom.webp" alt="Galereya" />
            </div>

            <div
              className={`gallery-item gallery-bottom ${galleryFront === "bottom" ? "gallery-item--front" : ""}`}
              onMouseEnter={() => setGalleryFront("bottom")}
            >
              <img src="/pool.webp" alt="Galereya" />
            </div>
          </div>

          <div
            className={`cards-container ${cardsInView ? "in-view" : ""}`}
            ref={cardsRef}
          >
            {t.about.cards.map((card, i) => {
              const Icon = cardIcons[i] ?? Smile;
              return (
                <div className="card" key={i} style={{ transitionDelay: `${0.05 + i * 0.1}s` }}>
                  <div className="icon">
                    <Icon size={26} strokeWidth={2.2} />
                  </div>
                  <div className="number">
                    <StatNumber raw={card.number} start={cardsInView} />
                  </div>
                  <div className="title">{card.title}</div>
                  <div className="description">{card.description}</div>
                </div>
              );
            })}
          </div>

          <div
            className={`mission-block ${missionInView ? "in-view" : ""}`}
            ref={missionRef}
          >
            <div className="mission-left">
              <span className="mission-quote-mark" aria-hidden="true">"</span>

              <h2 className="mission-title">
                {t.about.missionTitleLine1}
                <br />
                <span className="mission-title-gold">{t.about.missionTitleLine2}</span>
              </h2>

              <p className="mission-text">
                {t.about.missionText}
              </p>

              <div className="feature-grid">
                {t.about.features.map((f, i) => (
                  <div
                    className="feature-box"
                    key={i}
                    style={{ transitionDelay: `${0.15 + i * 0.08}s` }}
                  >
                    <span className="feature-icon">
                      {f.code ? f.code : featureIcons[f.icon]}
                    </span>
                    <span className="feature-label">{f.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mission-right">
              <div className="mission-img-frame">
                <img
                  className="mission-img"
                  src="/mainhall.webp"
                  alt={t.about.missionImgAlt}
                />
                <div className="mission-img-overlay"></div>
                <span className="mission-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3Z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </span>
              </div>

              <div className="mission-quote">
                <span className="quote-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M12 3 1 9l11 6 9-4.9V17h2V9L12 3Z" />
                    <path d="M5 13.18v4.5C5 19.5 8.13 21 12 21s7-1.5 7-3.32v-4.5" />
                  </svg>
                </span>
                <p className="quote-text">
                  "{t.about.quote}{" "}
                  <span className="quote-underline">{t.about.quoteUnderline}</span>".
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section id="travel" className="tour-section">
        <div className="tour-stage">

          <div
            className={`tour-header ${tourHeaderInView ? "in-view" : ""}`}
            ref={tourHeaderRef}
          >
            <div className="tour-eyebrow">
              <span className="tour-line"></span>
              {t.tour.eyebrow}
            </div>
            <h2 className="tour-title">{t.tour.titleLine1} <span className="tour-title-span">{t.tour.titleLine2}</span></h2>
            <p className="tour-subtitle">
              {t.tour.subtitle}
            </p>

            <div className="tour-progress-wrap" aria-hidden="true">
              <div className="tour-progress-track">
                <div
                  className="tour-progress-fill"
                  style={{ transform: `scaleX(${Math.max(scrollRatio, 0.02)})` }}
                ></div>
              </div>
              <span className="tour-progress-count">
                {String(activeDot + 1).padStart(2, "0")} / {String(tourImages.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          <button
            type="button"
            className="tour-arrow tour-arrow-prev"
            aria-label="Oldingi"
            onClick={() => scrollByPanel(-1)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 5 8 12l7 7" />
            </svg>
          </button>
          <button
            type="button"
            className="tour-arrow tour-arrow-next"
            aria-label="Keyingi"
            onClick={() => scrollByPanel(1)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m9 5 7 7-7 7" />
            </svg>
          </button>

          <div
            className={`tour-track ${tourTrackInView ? "in-view" : ""}`}
            ref={(node) => {
              trackRef.current = node;
              tourTrackRef.current = node;
            }}
          >
            {tourData.map((card, i) => (
              <div
                className={`tour-panel ${activeDot === i ? "tour-panel--active" : ""}`}
                key={i}
                style={{ transitionDelay: `${0.08 + i * 0.08}s`, "--panel-accent": `var(--${card.badgeColor})` }}
              >
                <img className="tour-img" key={activeThumb[i]} src={card.gallery[activeThumb[i]]} alt={card.title} />
                <div className="tour-overlay"></div>

                <span className="tour-num">{card.num}<i>/{String(tourImages.length).padStart(2, "0")}</i></span>

                <div className="tour-content">
                  <span className={`tour-badge tour-badge--${card.badgeColor}`}>{card.badge}</span>
                  <h3 className="tour-card-title">{card.title}</h3>
                  <p className="tour-desc">{card.desc}</p>

                  <div className="tour-thumbs">
                    {card.gallery.map((imgSrc, tIdx) => (
                      <button
                        type="button"
                        className={`thumb ${activeThumb[i] === tIdx ? "thumb-active" : ""}`}
                        key={tIdx}
                        onClick={(e) => { e.stopPropagation(); selectThumb(i, tIdx); }}
                        aria-label={`${card.title} ${tIdx + 1}`}
                      >
                        <img src={imgSrc} alt="" />
                      </button>
                    ))}
                    {card.extra > 0 && (
                      <div className="thumb thumb-more">+{card.extra}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="tour-dots">
            {tourImages.map((_, i) => (
              <button
                type="button"
                key={i}
                className={`tour-dot ${activeDot === i ? "active" : ""}`}
                aria-label={`${i + 1}`}
                onClick={() => scrollToPanel(i)}
              />
            ))}
          </div>
        </div>
            <div className="tour-line2"></div>
      </section>
    </>
  );
}