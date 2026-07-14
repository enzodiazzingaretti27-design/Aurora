"use client";

import type { Language, PropertyData } from "@/types/property";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./InquiryForm";

const floatLabel: Record<Language, string> = {
  en: "Chat on WhatsApp",
  es: "Escribinos por WhatsApp",
  pt: "Fale pelo WhatsApp",
};

const floatIntro: Record<Language, (brand: string) => string> = {
  en: (brand) => `Hi! I'd like to ask about ${brand}.`,
  es: (brand) => `¡Hola! Quiero consultar por ${brand}.`,
  pt: (brand) => `Olá! Quero consultar sobre ${brand}.`,
};

export default function WhatsAppFloat({
  data,
  language,
}: {
  data: PropertyData;
  language: Language;
}) {
  const url = buildWhatsAppUrl(data.whatsappNumber, floatIntro[language](data.brandName));
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={floatLabel[language]}
      title={floatLabel[language]}
      className="fixed bottom-5 right-5 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:brightness-105 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
