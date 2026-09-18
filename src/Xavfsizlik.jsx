import React, { useEffect, useRef, useState } from "react";
import {
  Camera,
  Lock,
  UserCheck,
  Droplets,
  HeartPulse,
  Flame,
  ArrowRight,
} from "lucide-react";
import "./Xavfsizlik.css";
import { useLanguage } from "./LanguageContext.jsx";

const featureIcons = [Camera, Lock, UserCheck, Droplets, HeartPulse, Flame];
const featureColors = ["#a9c8e8", "#c49f5b", "#8fb896", "#f2b8c6", "#f2d479", "#e8638a"];

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

function RevealCard({ children, className = "", delay = 0, style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`${className} ${visible ? "saf-in-view" : ""}`}
      style={{ ...style, "--delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function Safety() {
  const { t } = useLanguage();
  const [headerRef, headerVisible] = useReveal();

  const FEATURES = t.xavfsizlik.features.map((f, i) => ({
    ...f,
    color: featureColors[i],
    Icon: featureIcons[i],
  }));

  return (
    <div id="security" className="saf-root">
      <div className="saf-inner">
        <div
          ref={headerRef}
          className={`saf-header ${headerVisible ? "saf-in-view" : ""}`}
        >
          <div>
            <div className="saf-eyebrow">{t.xavfsizlik.eyebrow}</div>
            <h2 className="saf-title">
              {t.xavfsizlik.titleLine1}
              <span className="gold">{t.xavfsizlik.titleGold}</span>
            </h2>
          </div>
          <p className="saf-lead">
            {t.xavfsizlik.lead}
          </p>
        </div>

        <div className="saf-grid">
          {FEATURES.map((f, i) => {
            const { Icon } = f;
            return (
              <RevealCard
                className="saf-card"
                key={f.title}
                delay={i * 90}
                style={{ "--accent": f.color }}
              >
                <div className="saf-card-icon">
                  <Icon strokeWidth={1.75} />
                </div>
                <h3 className="saf-card-title">{f.title}</h3>
                <span className="saf-card-tag">{f.tag}</span>
                <p className="saf-card-desc">{f.desc}</p>
              </RevealCard>
            );
          })}
        </div>

        <RevealCard className="saf-banner" delay={200}>
          <div className="saf-banner-left">
            <div className="saf-banner-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2L4 5v6c0 5.25 3.4 9.74 8 11 4.6-1.26 8-5.75 8-11V5l-8-3z"
                  fill="#d4b679"
                />
                <path
                  d="M8.5 12.2l2.4 2.4 4.6-4.8"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h4 className="saf-banner-title">
                {t.xavfsizlik.bannerTitle}
              </h4>
              <p className="saf-banner-desc">
                {t.xavfsizlik.bannerDesc}
              </p>
            </div>
          </div>
          <button className="saf-banner-btn">
            {t.xavfsizlik.bannerBtn} <ArrowRight size={15} />
          </button>
        </RevealCard>
      </div>
    </div>
  );
}
