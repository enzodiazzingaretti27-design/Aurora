"use client";

import Link from "next/link";
import { useState } from "react";
import type { Language } from "@/types/property";
import { properties, propertySlugs } from "@/data/properties";

const languageOptions: { code: Language; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "es", label: "Español", flag: "🇦🇷" },
  { code: "pt", label: "Português", flag: "🇧🇷" },
];

const hubCopy: Record<Language, { kicker: string; title: string; cta: string }> = {
  en: { kicker: "Two houses", title: "Choose your stay.", cta: "Discover" },
  es: { kicker: "Dos casas", title: "Elegí tu estadía.", cta: "Descubrir" },
  pt: { kicker: "Duas casas", title: "Escolha sua estadia.", cta: "Descobrir" },
};

export default function Hub() {
  const [language, setLanguage] = useState<Language>("es");
  const copy = hubCopy[language];

  return (
    <main className="min-h-screen bg-[color:var(--cream)] text-[color:var(--brown)]">
      <nav className="flex items-center justify-between px-6 py-6 md:px-12">
        <p className="font-display text-2xl tracking-[0.18em]">Cecilia</p>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 border border-[color:var(--brown)]/20 bg-black/5 p-1 backdrop-blur-md">
            {languageOptions.map((option) => (
              <button
                key={option.code}
                type="button"
                onClick={() => setLanguage(option.code)}
                aria-label={option.label}
                className={`flex h-8 w-8 items-center justify-center text-base transition ${
                  language === option.code
                    ? "bg-[color:var(--brown)] text-[color:var(--cream)]"
                    : "text-[color:var(--brown)]/60 hover:bg-black/10"
                }`}
              >
                {option.flag}
              </button>
            ))}
          </div>
          <Link
            href="/panel"
            className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--brown)]/30 px-4 py-2 text-[13px] text-[color:var(--brown)]/75 transition hover:border-[color:var(--brown)] hover:text-[color:var(--brown)]"
          >
            <span aria-hidden="true">🔒</span> Panel
          </Link>
        </div>
      </nav>

      <section className="px-6 pb-16 pt-10 md:px-12">
        <p className="mb-4 text-[11px] uppercase tracking-[0.34em] text-[color:var(--gold)]">
          {copy.kicker}
        </p>
        <h1 className="font-display text-balance text-5xl leading-[0.95] tracking-[-0.03em] md:text-7xl">
          {copy.title}
        </h1>
      </section>

      <section className="grid gap-6 px-6 pb-20 md:grid-cols-2 md:px-12">
        {propertySlugs.map((slug) => {
          const data = properties[slug];
          const t = data.copy[language];
          return (
            <Link
              key={slug}
              href={`/${slug}`}
              className="group relative block h-[70vh] min-h-[420px] overflow-hidden bg-black"
            >
              <div
                className="image-cover absolute inset-0 h-full w-full scale-105 transition duration-[1200ms] group-hover:scale-110"
                style={{ backgroundImage: `url(${data.images.hero})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />
              <div className="relative z-10 flex h-full flex-col justify-end p-8 text-[color:var(--cream)]">
                <p className="mb-3 text-[11px] uppercase tracking-[0.34em] text-[color:var(--sand)]">
                  {t.coordinates}
                </p>
                <h2 className="font-display text-4xl md:text-5xl">{data.brandName}</h2>
                <p className="mt-3 max-w-sm font-light text-white/80">{t.heroSubtitle}</p>
                <span className="mt-6 inline-flex w-fit items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-white/70">
                  {copy.cta}
                  <span className="h-px w-12 bg-white/45 transition group-hover:w-20" />
                </span>
              </div>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
