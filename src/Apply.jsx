import React, { useState } from "react";
import "./Apply.css";
import { useLanguage } from "./LanguageContext.jsx";

export default function Apply() {
  const { lang, setLang, t } = useLanguage();
  const AGE_OPTIONS = t.apply.ageOptions;

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    childAge: "",
  });
  const [status, setStatus] = useState("idle");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    try {
      const BITRIX_WEBHOOK_URL = "https://your-domain.bitrix24.com/rest/1/your-webhook-key/crm.lead.add.json";

      const response = await fetch(BITRIX_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: {
            TITLE: `Murojaat: ${form.fullName}`,
            NAME: form.fullName,
            PHONE: [{ VALUE: form.phone, VALUE_TYPE: "WORK" }],
            COMMENTS: `Farzand yoshi: ${form.childAge}`,
          },
        }),
      });

      if (!response.ok) throw new Error("Yuborishda xatolik");

      setStatus("success");
      setForm({ fullName: "", phone: "", childAge: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <section className="apply">
      <div className="apply__tint" />

      <header className="apply__header">
        <div className="apply__brand">
          <div className="apply__brand-mark"><img className="apply__brand-mark" src="/logo.webp" alt="Logo" /></div>
          <span className="apply__brand-name">OXU KIDS</span>
        </div>
        <div className="apply__lang">
          <button
            type="button"
            className={`apply__lang-btn ${lang === "uz" ? "apply__lang-btn--active" : ""}`}
            onClick={() => setLang("uz")}
          >
            UZ
          </button>
          <button
            type="button"
            className={`apply__lang-btn ${lang === "ru" ? "apply__lang-btn--active" : ""}`}
            onClick={() => setLang("ru")}
          >
            RU
          </button>
        </div>
      </header>

      <div className="apply__inner">
        <h1 className="apply__heading">{t.apply.heading}</h1>
        <p className="apply__subtext">
          {t.apply.subtext}
        </p>

        <form className="apply__form" onSubmit={handleSubmit}>
          <div className="apply__field">
            <label htmlFor="fullName">{t.apply.labelName}</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder={t.apply.placeholderName}
              value={form.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="apply__field">
            <label htmlFor="phone">{t.apply.labelPhone}</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+998 55 310 10 10"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="apply__field">
            <label htmlFor="childAge">{t.apply.labelAge}</label>
            <div className="apply__select-wrap">
              <select
                id="childAge"
                name="childAge"
                value={form.childAge}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  {t.apply.selectPlaceholder}
                </option>
                {AGE_OPTIONS.map((age) => (
                  <option key={age} value={age}>
                    {age}
                  </option>
                ))}
              </select>
              <span className="apply__select-arrow">⌄</span>
            </div>
          </div>

          <button type="submit" className="apply__submit" disabled={status === "sending"}>
            {status === "sending" ? t.apply.submitting : t.apply.submit}
            {status !== "sending" && <span className="apply__submit-arrow">→</span>}
          </button>

          {status === "success" && (
            <p className="apply__message apply__message--success">
              {t.apply.success}
            </p>
          )}
          {status === "error" && (
            <p className="apply__message apply__message--error">
              {t.apply.error}
            </p>
          )}
        </form>

        <a href="/" className="apply__back">
          {t.apply.back}
        </a>
      </div>
    </section>
  );
}
