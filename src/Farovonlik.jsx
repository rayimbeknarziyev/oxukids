import React, { useEffect, useRef, useState } from "react";
import {
  Thermometer,
  LifeBuoy,
  Baby,
  Lock,
  Wind,
  ShieldCheck,
  Smile,
  Timer,
} from "lucide-react";
import "./Farovonlik.css";
import { useLanguage } from "./LanguageContext.jsx";

const cardImages = ["/pool.webp", "/tuzlixona.webp"];
const cardIconSets = [
  [Thermometer, LifeBuoy, Baby, Lock],
  [Wind, ShieldCheck, Smile, Timer],
];

const thumbnails = [
  "poolkarusel1.webp",
  "poolkarusel2.webp",
  "poolkarusel3.webp",
  "poolkarusel4.webp",
  "poolkarusel5.webp",
  "poolkarusel6.webp",
];

// 0-2 rasm -> Basseyn kartasi (card index 0)
// 3-5 rasm -> Tuzli xona kartasi (card index 1)
const thumbCardIndex = [0, 0, 0, 1, 1, 1];

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

export default function WellnessSection() {
  const { t } = useLanguage();
  const [activeThumb, setActiveThumb] = useState(0);

  // har bir karta hozir qaysi rasmni ko'rsatayotganini saqlaydi
  const [cardActiveImages, setCardActiveImages] = useState({
    0: cardImages[0],
    1: cardImages[1],
  });

  const [heroRef, heroVisible] = useReveal();
  const [cardsRef, cardsVisible] = useReveal();
  const [carouselRef, carouselVisible] = useReveal();

  const cards = t.farovonlik.cards.map((card, i) => ({
    title: card.title,
    desc: card.desc,
    image: cardActiveImages[i] ?? cardImages[i],
    features: card.features.map((text, j) => ({ Icon: cardIconSets[i][j], text })),
  }));

  const selectThumb = (i) => {
    setActiveThumb(i);
    const targetCard = thumbCardIndex[i];
    setCardActiveImages((prev) => ({
      ...prev,
      [targetCard]: thumbnails[i],
    }));
  };

  return (
    <section className="wellness">
      <div
        className="wellness__hero"
        style={{ backgroundImage: "url(/pool.webp)" }}
      >
        <div className="wellness__hero-fade" />
        <div
          ref={heroRef}
          className={`wellness__hero-content ${heroVisible ? "wellness-in-view" : ""}`}
        >
          <span className="wellness__eyebrow">{t.farovonlik.eyebrow}</span>
          <h2 className="wellness__title">
            {t.farovonlik.titleLine1}
            <br />
            <span className="wellness__title-accent">{t.farovonlik.titleAccent}</span>
          </h2>
        </div>
      </div>

      <div className="wellness__body">
        <div
          ref={cardsRef}
          className={`wellness__cards ${cardsVisible ? "wellness-in-view" : ""}`}
        >
          {cards.map((card, i) => (
            <div
              key={card.title}
              className="wellness-card"
              style={{ "--delay": `${i * 150}ms` }}
            >
              <div
                key={card.image}
                className="wellness-card__bg wellness-card__bg--swap"
                style={{ backgroundImage: `url(${card.image})` }}
              />
              <div className="wellness-card__overlay" />
              <div className="wellness-card__content">
                <h3 className="wellness-card__title">{card.title}</h3>
                <p className="wellness-card__desc">{card.desc}</p>
                <div className="wellness-card__features">
                  {card.features.map((f) => {
                    const { Icon } = f;
                    return (
                      <div className="wellness-card__feature" key={f.text}>
                        <span className="wellness-card__feature-icon">
                          <Icon size={16} strokeWidth={1.75} />
                        </span>
                        <span>{f.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          ref={carouselRef}
          className={`wellness__carousel ${carouselVisible ? "wellness-in-view" : ""}`}
        >
          {thumbnails.map((src, i) => (
            <button
              key={src}
              type="button"
              className={
                "wellness__thumb" +
                (i === activeThumb ? " wellness__thumb--active" : "")
              }
              style={{ backgroundImage: `url(${src})`, "--delay": `${i * 60}ms` }}
              onClick={() => selectThumb(i)}
              aria-label={`${t.farovonlik.thumbAlt} ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}