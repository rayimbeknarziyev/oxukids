import React, { useState, useMemo, useEffect, useRef } from "react";
import { X } from "lucide-react";
import "./Gallery.css";
import { useLanguage } from "./LanguageContext.jsx";

const CATEGORY_IDS = [
  "barchasi",
  "asosiy-zal",
  "oyin-xonasi",
  "basseyn",
  "gimnastika-zali",
  "tuzli-xona",
  "dam-olish-xonasi",
  "kiyinish-xonasi",
];

const CATEGORY_COLORS = {
  barchasi: "var(--gold)",
  "asosiy-zal": "var(--gold)",
  "oyin-xonasi": "var(--pink)",
  basseyn: "var(--blue)",
  "gimnastika-zali": "var(--green)",
  "tuzli-xona": "var(--gold)",
  "dam-olish-xonasi": "var(--gold)",
  "kiyinish-xonasi": "var(--magenta)",
};

const IMAGES = [
  { id: "asosiy-zal-1", category: "asosiy-zal", src: "/gallaryimages/asosiy-zal-1.webp" },
  { id: "asosiy-zal-2", category: "asosiy-zal", src: "/gallaryimages/asosiy-zal-2.webp" },
  { id: "asosiy-zal-3", category: "asosiy-zal", src: "/gallaryimages/asosiy-zal-3.webp" },
  { id: "asosiy-zal-4", category: "asosiy-zal", src: "/gallaryimages/asosiy-zal-4.webp" },
  { id: "asosiy-zal-5", category: "asosiy-zal", src: "/gallaryimages/asosiy-zal-5.webp" },
  { id: "asosiy-zal-6", category: "asosiy-zal", src: "/gallaryimages/asosiy-zal-6.webp" },
  { id: "asosiy-zal-7", category: "asosiy-zal", src: "/gallaryimages/asosiy-zal-7.webp" },

  { id: "oyin-xonasi-1", category: "oyin-xonasi", src: "/gallaryimages/oyin-xonasi-1.webp" },
  { id: "oyin-xonasi-2", category: "oyin-xonasi", src: "/gallaryimages/oyin-xonasi-2.webp" },
  { id: "oyin-xonasi-3", category: "oyin-xonasi", src: "/gallaryimages/oyin-xonasi-3.webp" },
  { id: "oyin-xonasi-4", category: "oyin-xonasi", src: "/gallaryimages/oyin-xonasi-4.webp" },

  { id: "basseyn-1", category: "basseyn", src: "/pool.webp" },
  { id: "basseyn-2", category: "basseyn", src: "/gallaryimages/basseyn-2.webp" },
  { id: "basseyn-3", category: "basseyn", src: "/gallaryimages/basseyn-3.webp" },
  { id: "basseyn-4", category: "basseyn", src: "/gallaryimages/basseyn-4.webp" },
  { id: "basseyn-5", category: "basseyn", src: "/gallaryimages/basseyn-5.webp" },

  { id: "gimnastika-zali-1", category: "gimnastika-zali", src: "/gallaryimages/gimnastika-zali-1.webp" },
  { id: "gimnastika-zali-2", category: "gimnastika-zali", src: "/gallaryimages/gimnastika-zali-2.webp" },
  { id: "gimnastika-zali-3", category: "gimnastika-zali", src: "/gallaryimages/gimnastika-zali-3.webp" },
  { id: "gimnastika-zali-4", category: "gimnastika-zali", src: "/gallaryimages/gimnastika-zali-4.webp" },
  { id: "gimnastika-zali-5", category: "gimnastika-zali", src: "/gallaryimages/gimnastika-zali-5.webp" },
  { id: "gimnastika-zali-6", category: "gimnastika-zali", src: "/gallaryimages/gimnastika-zali-6.webp" },
  { id: "gimnastika-zali-7", category: "gimnastika-zali", src: "/gallaryimages/gimnastika-zali-7.webp" },
  { id: "gimnastika-zali-8", category: "gimnastika-zali", src: "/gallaryimages/gimnastika-zali-2.webp" },

  { id: "tuzli-xona-1", category: "tuzli-xona", src: "/gallaryimages/tuzli-xona-1.webp" },
  { id: "tuzli-xona-2", category: "tuzli-xona", src: "/gallaryimages/tuzli-xona-2.webp" },
  { id: "tuzli-xona-3", category: "tuzli-xona", src: "/gallaryimages/tuzli-xona-3.webp" },
  { id: "tuzli-xona-4", category: "tuzli-xona", src: "/gallaryimages/tuzli-xona-4.webp" },
  { id: "tuzli-xona-5", category: "tuzli-xona", src: "/gallaryimages/tuzli-xona-2.webp" },

  { id: "dam-olish-xonasi-1", category: "dam-olish-xonasi", src: "/gallaryimages/dam-olish-xonasi-1.webp" },
  { id: "dam-olish-xonasi-2", category: "dam-olish-xonasi", src: "/gallaryimages/dam-olish-xonasi-2.webp" },
  { id: "dam-olish-xonasi-3", category: "dam-olish-xonasi", src: "/gallaryimages/dam-olish-xonasi-3.webp" },
  { id: "dam-olish-xonasi-4", category: "dam-olish-xonasi", src: "/gallaryimages/dam-olish-xonasi-4.webp" },
  { id: "dam-olish-xonasi-5", category: "dam-olish-xonasi", src: "/gallaryimages/dam-olish-xonasi-2.webp" },

  { id: "kiyinish-xonasi-1", category: "kiyinish-xonasi", src: "/gallaryimages/kiyinish-xonasi-1.webp" },
  { id: "kiyinish-xonasi-2", category: "kiyinish-xonasi", src: "/gallaryimages/kiyinish-xonasi-2.webp" },
  { id: "kiyinish-xonasi-3", category: "kiyinish-xonasi", src: "/gallaryimages/kiyinish-xonasi-3.webp" },
  { id: "kiyinish-xonasi-4", category: "kiyinish-xonasi", src: "/gallaryimages/kiyinish-xonasi-4.webp" },
];

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

export default function Gallery() {
  const {t} = useLanguage();
  const [activeFilter, setActiveFilter] = useState("barchasi");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const [headerRef, headerVisible] = useReveal();
  const [filtersRef, filtersVisible] = useReveal();
  const [gridRef, gridVisible] = useReveal();

  const CATEGORIES = CATEGORY_IDS.map((id) => ({
    id,
    label: t.gallery.categories[id],
    color: CATEGORY_COLORS[id],
  }));

  const CATEGORY_MAP = CATEGORIES.reduce((acc, c) => {
    acc[c.id] = c;
    return acc;
  }, {});

  const filteredImages = useMemo(() => {
    if (activeFilter === "barchasi") return IMAGES;
    return IMAGES.filter((img) => img.category === activeFilter);
  }, [activeFilter]);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex]);

  const activeImage =
    lightboxIndex !== null ? filteredImages[lightboxIndex] : null;
  const activeCategory = activeImage ? CATEGORY_MAP[activeImage.category] : null;

  return (
    <div id="gallery" className="gal-root">
      <div className="gal-inner">
        <div
          ref={headerRef}
          className={`gal-header ${headerVisible ? "gal-in-view" : ""}`}
        >
          <div>
            <div className="gal-eyebrow">{t.gallery.eyebrow}</div>
            <h2 className="gal-title">
              {t.gallery.titleLine1}
              <span className="gold">{t.gallery.titleGold}</span>
            </h2>
          </div>
          <div className="gal-count">
            {IMAGES.length} {t.gallery.countSuffix}
          </div>
        </div>

        <div
          ref={filtersRef}
          className={`gal-filters ${filtersVisible ? "gal-in-view" : ""}`}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`gal-filter-btn ${activeFilter === cat.id ? "active" : ""}`}
              style={{ "--btn-color": cat.color }}
              onClick={() => setActiveFilter(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div
          ref={gridRef}
          className={`gal-grid ${gridVisible ? "gal-in-view" : ""}`}
          key={activeFilter}
        >
          {filteredImages.map((img, index) => {
            const cat = CATEGORY_MAP[img.category];
            return (
              <div
                className="gal-item"
                key={img.id}
                style={{ "--delay": `${Math.min(index, 10) * 90}ms` }}
                onClick={() => openLightbox(index)}
              >
                <img src={img.src} alt={cat.label} loading="lazy" />
                <div className="gal-item-overlay">
                  <span
                    className="gal-item-badge"
                    style={{ "--badge-color": cat.color }}
                  >
                    {cat.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {activeImage && (
        <div
          className="gal-lightbox"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
        >
          <div className="gal-lightbox-inner">
            <img src={activeImage.src} alt={activeCategory.label} />
            <div className="gal-lightbox-gradient" />
            <div className="gal-lightbox-caption">
              <h4>{activeCategory.label}</h4>
              <span>
                {lightboxIndex + 1} / {filteredImages.length}
              </span>
            </div>
            <button className="gal-lightbox-close" onClick={closeLightbox}>
              <X size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
