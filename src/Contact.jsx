import React, { useState, useRef, useEffect } from "react";
import { MapPin, Phone, Mail, Info, ChevronDown, Smartphone } from "lucide-react";
import "./Contact.css";
import { useLanguage } from "./LanguageContext.jsx";

const AGES = [2, 3, 4, 5, 6, 7];

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

export default function Contact() {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const wrapRef = useRef(null);

  const [headerRef, headerVisible] = useReveal();
  const [formRef, formVisible] = useReveal();
  const [infoRef, infoVisible] = useReveal();

  useEffect(() => {
    const onClickOutside = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div id="contact" className="contact-root">
      <div className="contact-inner">
        <div
          ref={headerRef}
          className={`contact-header-wrap ${headerVisible ? "contact-in-view" : ""}`}
        >
          <div className="contact-eyebrow-row">
            <div className="contact-eyebrow">{t.contact.eyebrow}</div>
          </div>

          <h2 className="contact-title">
            {t.contact.titleLine1}
            <span className="gold">{t.contact.titleGold}</span>
          </h2>

          <p className="contact-lead">
            {t.contact.lead}
          </p>
        </div>

        <div className="contact-grid">
          <form
            ref={formRef}
            className={`contact-form ${formVisible ? "contact-in-view" : ""}`}
            onSubmit={handleSubmit}
          >
            <div className="contact-field">
              <label className="contact-label">{t.contact.labelName}</label>
              <input
                className="contact-input"
                type="text"
                placeholder={t.contact.placeholderName}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="contact-field">
              <label className="contact-label">{t.contact.labelPhone}</label>
              <input
                className="contact-input"
                type="tel"
                placeholder="+998 55 310 10 10"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="contact-field" ref={wrapRef}>
              <label className="contact-label">{t.contact.labelAge}</label>
              <div className="contact-select-wrap">
                <button
                  type="button"
                  className={`contact-select-trigger ${isOpen ? "open" : ""} ${
                    age === null ? "placeholder" : ""
                  }`}
                  onClick={() => setIsOpen((v) => !v)}
                >
                  <span>{age ? `${age} ${t.contact.ageSuffix}` : t.contact.selectPlaceholder}</span>
                  <span className="contact-select-right">
                    <span className="contact-select-dot" />
                    <span className="contact-select-chevron">
                      <ChevronDown size={16} />
                    </span>
                  </span>
                </button>

                {isOpen && (
                  <div className="contact-select-panel">
                    <div className="contact-select-panel-label">
                      {t.contact.selectPanelLabel}
                    </div>
                    <div className="contact-age-grid">
                      {AGES.map((a) => (
                        <button
                          type="button"
                          key={a}
                          className={`contact-age-btn ${
                            age === a ? "selected" : ""
                          }`}
                          onClick={() => {
                            setAge(a);
                            setIsOpen(false);
                          }}
                        >
                          <span className="contact-age-num">{a}</span>
                          <span className="contact-age-label">{t.contact.ageSuffix}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button type="submit" className="contact-submit">
              {t.contact.submit}
            </button>
          </form>

          <div
            ref={infoRef}
            className={`contact-info-list ${infoVisible ? "contact-in-view" : ""}`}
          >
            <div className="contact-info-card" style={{ "--delay": "0ms" }}>
              <div className="contact-info-icon">
                <MapPin strokeWidth={1.75} />
              </div>
              <div>
                <div className="contact-info-label">{t.contact.infoAddressLabel}</div>
                <div className="contact-info-title">{t.contact.infoAddressTitle}</div>
                <div className="contact-info-sub">{t.contact.infoAddressSub}</div>
              </div>
            </div>

            <div className="contact-info-card" style={{ "--delay": "160ms" }}>
              <div className="contact-info-icon">
                <Phone strokeWidth={1.75} />
              </div>
              <div>
                <div className="contact-info-label">{t.contact.infoPhoneLabel}</div>
                <div className="contact-info-title">+998 55 310 10 10</div>
                <div className="contact-info-sub">{t.contact.infoPhoneSub}</div>
              </div>
            </div>

            <div className="contact-info-card" style={{ "--delay": "320ms" }}>
              <div className="contact-info-icon">
                <Mail strokeWidth={1.75} />
              </div>
              <div>
                <div className="contact-info-label">{t.contact.infoEmailLabel}</div>
                <div className="contact-info-title">info@oxukids.uz</div>
                <div className="contact-info-sub">{t.contact.infoEmailSub}</div>
              </div>
            </div>

            <div className="contact-info-card" style={{ "--delay": "480ms" }}>
              <div className="contact-info-icon">
                <Smartphone strokeWidth={1.75} />
              </div>
              <div>
                <div className="contact-info-label">{t.contact.infoSocialLabel}</div>
                <div className="contact-info-title">@oxukids</div>
                <div className="contact-info-sub">
                  {t.contact.infoSocialSub}
                </div>
              </div>
            </div>

            <div className="contact-note" style={{ "--delay": "640ms" }}>
              <div className="contact-note-icon">
                <Info strokeWidth={1.75} />
              </div>
              <div>
                <div className="contact-note-title">{t.contact.noteTitle}</div>
                <div className="contact-note-text">
                  {t.contact.noteText}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
