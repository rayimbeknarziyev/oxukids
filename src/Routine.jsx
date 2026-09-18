import React, { useEffect, useRef, useState } from "react";
import { DoorOpen, BookOpen, Utensils, Moon, Pencil, Gamepad2, Home } from "lucide-react";
import "./Routine.css";
import { useLanguage } from "./LanguageContext.jsx";

const itemColors = ["#c1d7eb", "#c69f5b", "#8fb896", "#f2b8c6", "#f2d479", "#8fb896", "#c49f5b"];
const itemIcons = [DoorOpen, BookOpen, Utensils, Moon, Pencil, Gamepad2, Home];
const itemSides = ["left", "right", "left", "right", "left", "right", "left"];

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
      { threshold: 0.25, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function ScheduleRow({ item }) {
  const { Icon } = item;
  const isLeft = item.side === "left";
  const [rowRef, visible] = useReveal();

  return (
    <div className={`ds-row ${visible ? "ds-in-view" : ""}`} ref={rowRef}>
      <div className={`ds-col left ${isLeft ? "" : "empty"}`}>
        <div className="ds-time" style={{ color: item.color }}>
          {item.time}
          <span className="ds-time-icon">
            <Icon size={15} color={item.color} />
          </span>
        </div>
        <h3 className="ds-item-title">{item.title}</h3>
        <p className="ds-item-desc">{item.desc}</p>
      </div>

      <div className="ds-node">
        <div className="ds-node-glow" style={{ background: item.color }} />
        <div className="ds-node-circle" style={{ borderColor: item.color }}>
          <Icon color={item.color} strokeWidth={1.75} />
        </div>
      </div>

      <div className={`ds-col right ${!isLeft ? "" : "empty"}`}>
        <div className="ds-time" style={{ color: item.color }}>
          <span className="ds-time-icon">
            <Icon size={15} color={item.color} />
          </span>
          {item.time}
        </div>
        <h3 className="ds-item-title">{item.title}</h3>
        <p className="ds-item-desc">{item.desc}</p>
      </div>
    </div>
  );
}

export default function DailySchedule() {
  const { t } = useLanguage();
  const timelineRef = useRef(null);
  const [fillPercent, setFillPercent] = useState(0);
  const [headerRef, headerVisible] = useReveal();

  const ITEMS = t.routine.items.map((item, i) => ({
    ...item,
    color: itemColors[i],
    Icon: itemIcons[i],
    side: itemSides[i],
  }));

  useEffect(() => {
    let ticking = false;

    const updateFill = () => {
      ticking = false;
      const el = timelineRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const scrolledInto = viewportHeight - rect.top;
      const range = viewportHeight + rect.height;
      const progress = Math.min(1, Math.max(0, scrolledInto / range));

      setFillPercent(progress * 100);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateFill);
      }
    };

    updateFill();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="ds-root">
      <div className="ds-inner">
        <div
          className={`ds-header ${headerVisible ? "ds-in-view" : ""}`}
          ref={headerRef}
        >
          <div>
            <div className="ds-eyebrow">{t.routine.eyebrow}</div>
            <h2 className="ds-title">
              {t.routine.titleLine1} <span className="gold">{t.routine.titleGold}</span>
            </h2>
          </div>
          <p className="ds-lead">
            {t.routine.lead}
          </p>
        </div>

        <div className="ds-timeline" ref={timelineRef}>
          <div className="ds-line-track">
            <div
              className="ds-line-fill"
              style={{ height: `${fillPercent}%` }}
            />
          </div>

          {ITEMS.map((item) => (
            <ScheduleRow item={item} key={item.time} />
          ))}
        </div>

        <div className="ds-note">
          <BookOpen color="#15308e" strokeWidth={1.75} />
          <span>
            {t.routine.note}
          </span>
        </div>
      </div>
    </div>
  );
}
