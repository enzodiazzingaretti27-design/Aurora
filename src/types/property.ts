export type Language = "en" | "es" | "pt";

export interface PropertySuite {
  name: string;
  text: string;
  detail: string;
}

export interface PropertyCopy {
  nav: string[];
  inquire: string;
  loader: string;
  coordinates: string;
  heroTitle: string;
  heroSubtitle: string;
  scroll: string;
  experienceLabel: string;
  experienceKicker: string;
  experienceTitle: string;
  experienceText: string;
  experiences: string[];
  galleryKicker: string;
  galleryTitle: string;
  galleryText: string;
  gallery: string[];
  suitesKicker: string;
  suitesTitle: string;
  suites: PropertySuite[];
  locationKicker: string;
  locationTitle: string;
  mapLabel: string;
  mapText: string;
  diningKicker: string;
  diningTitle: string;
  diningText: string;
  finalKicker: string;
  finalTitle: string;
  finalText: string;
  reserve: string;
  footerPlace: string;
}

export interface PropertyImages {
  hero: string;
  mountains: string;
  vineyard: string;
  interior: string;
  fire: string;
  horses: string;
  table: string;
  bath: string;
  architecture: string;
}

export interface PropertyData {
  slug: string;
  brandName: string;
  reserveEmail: string;
  /** Número de WhatsApp con código de país, solo dígitos (ej. "5492610000000"). */
  whatsappNumber: string;
  locationDetails: string[];
  images: PropertyImages;
  copy: Record<Language, PropertyCopy>;
}
