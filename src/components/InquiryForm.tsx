"use client";

import { useState } from "react";
import type { Language, PropertyData } from "@/types/property";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const formCopy: Record<
  Language,
  {
    heading: string;
    name: string;
    checkIn: string;
    checkOut: string;
    guests: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
    emailAlt: string;
    intro: (brand: string) => string;
    lines: {
      name: string;
      dates: string;
      guests: string;
    };
  }
> = {
  en: {
    heading: "Check availability",
    name: "Name",
    checkIn: "Check-in",
    checkOut: "Check-out",
    guests: "Guests",
    message: "Message",
    messagePlaceholder: "Anything you'd like to ask…",
    submit: "Ask on WhatsApp",
    emailAlt: "Or write us by email",
    intro: (brand) => `Hi! I'd like to ask about ${brand}.`,
    lines: { name: "Name", dates: "Dates", guests: "Guests" },
  },
  es: {
    heading: "Consultar disponibilidad",
    name: "Nombre",
    checkIn: "Entrada",
    checkOut: "Salida",
    guests: "Personas",
    message: "Mensaje",
    messagePlaceholder: "Lo que quieras preguntar…",
    submit: "Consultar por WhatsApp",
    emailAlt: "O escribinos por email",
    intro: (brand) => `¡Hola! Quiero consultar por ${brand}.`,
    lines: { name: "Nombre", dates: "Fechas", guests: "Personas" },
  },
  pt: {
    heading: "Consultar disponibilidade",
    name: "Nome",
    checkIn: "Entrada",
    checkOut: "Saída",
    guests: "Pessoas",
    message: "Mensagem",
    messagePlaceholder: "O que quiser perguntar…",
    submit: "Consultar pelo WhatsApp",
    emailAlt: "Ou escreva por email",
    intro: (brand) => `Olá! Quero consultar sobre ${brand}.`,
    lines: { name: "Nome", dates: "Datas", guests: "Pessoas" },
  },
};

export default function InquiryForm({
  data,
  language,
}: {
  data: PropertyData;
  language: Language;
}) {
  const t = formCopy[language];
  const [name, setName] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parts = [t.intro(data.brandName)];
    if (name.trim()) parts.push(`${t.lines.name}: ${name.trim()}`);
    if (checkIn || checkOut)
      parts.push(`${t.lines.dates}: ${checkIn || "?"} → ${checkOut || "?"}`);
    if (guests.trim()) parts.push(`${t.lines.guests}: ${guests.trim()}`);
    if (message.trim()) parts.push(message.trim());
    const url = buildWhatsAppUrl(data.whatsappNumber, parts.join("\n"));
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const fieldClass =
    "w-full rounded-lg border border-white/25 bg-white/10 px-3 py-2.5 text-[15px] text-white placeholder-white/50 outline-none backdrop-blur-sm focus:border-white/60 focus:ring-2 focus:ring-white/20";
  const labelClass = "mb-1.5 block text-left text-[12px] uppercase tracking-[0.18em] text-white/60";

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-10 w-full max-w-md space-y-4 text-left"
    >
      <div>
        <label htmlFor="iq-name" className={labelClass}>
          {t.name}
        </label>
        <input
          id="iq-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={fieldClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="iq-in" className={labelClass}>
            {t.checkIn}
          </label>
          <input
            id="iq-in"
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="iq-out" className={labelClass}>
            {t.checkOut}
          </label>
          <input
            id="iq-out"
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="iq-guests" className={labelClass}>
          {t.guests}
        </label>
        <input
          id="iq-guests"
          type="number"
          min="1"
          inputMode="numeric"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="iq-message" className={labelClass}>
          {t.message}
        </label>
        <textarea
          id="iq-message"
          rows={2}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t.messagePlaceholder}
          className={`${fieldClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 py-3.5 text-[15px] font-semibold text-[#0b3d24] transition hover:brightness-105"
      >
        <WhatsAppIcon className="h-5 w-5" />
        {t.submit}
      </button>

      <a
        href={`mailto:${data.reserveEmail}`}
        className="block text-center text-[12px] uppercase tracking-[0.2em] text-white/55 transition hover:text-white/80"
      >
        {t.emailAlt}
      </a>
    </form>
  );
}

export function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.58-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
