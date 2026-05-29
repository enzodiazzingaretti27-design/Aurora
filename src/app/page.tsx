"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import { useEffect, useState } from "react";

type Language = "en" | "es" | "pt";

const images = {
  hero:
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2400&q=85",
  mountains:
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1800&q=85",
  vineyard:
    "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1800&q=85",
  interior:
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=85",
  fire:
    "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=1800&q=85",
  horses:
    "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1800&q=85",
  table:
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1800&q=85",
  bath:
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=85",
  architecture:
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=85",
};

const languageOptions: { code: Language; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "es", label: "Español", flag: "🇦🇷" },
  { code: "pt", label: "Português", flag: "🇧🇷" },
];

const copy = {
  en: {
    nav: ["Experience", "Gallery", "Suites", "Reserve"],
    inquire: "Inquire",
    loader: "Estancia Retreat",
    coordinates: "Mendoza, Argentina · 33.0° S / 68.8° W",
    heroTitle: "A retreat in the heart of Mendoza.",
    heroSubtitle: "Silence. Wine. Mountain air.",
    scroll: "Scroll",
    experienceLabel: "Slow living",
    experienceKicker: "The experience",
    experienceTitle:
      "A secluded estancia shaped by quiet architecture, old vines, and the rhythm of the Andes.",
    experienceText:
      "Aurora is not designed around urgency. Days unfold slowly: a fire waking before breakfast, horses crossing the pale morning, lunch under filtered shade, and evenings poured into deep glasses of Malbec as the mountains dissolve into blue.",
    experiences: [
      "Horseback riding at first light",
      "Private tastings among old vines",
      "Fire-cooked dinners beneath the stars",
      "Outdoor baths facing the Andes",
      "Silent mountain mornings",
      "Slow evenings by candlelight",
    ],
    galleryKicker: "Visual journal",
    galleryTitle: "Landscapes, textures, rituals.",
    galleryText: "A cinematic archive of vines, stone, fire, linen, and silence.",
    gallery: ["Old vines", "Stone interiors", "Open fire", "Morning rides", "Wine culture", "Outdoor rituals"],
    suitesKicker: "Rooms / Suites",
    suitesTitle:
      "Private rooms composed with restraint, warmth, and mountain light.",
    suites: [
      {
        name: "Andes Suite",
        text: "A private refuge of stone, linen, and morning light with uninterrupted mountain views.",
        detail: "72 sqm · private terrace",
      },
      {
        name: "Tierra Room",
        text: "Earth-toned interiors, sculptural quiet, and a deep bathtub open to the garden.",
        detail: "48 sqm · garden bath",
      },
      {
        name: "Sol Residence",
        text: "A standalone residence designed for long lunches, slow afternoons, and golden silence.",
        detail: "110 sqm · fire patio",
      },
    ],
    locationKicker: "Location",
    locationTitle:
      "At the foothills of the Andes, just 40 minutes from Mendoza city.",
    mapLabel: "Minimal map",
    mapText: "Mendoza countryside / Andes horizon",
    diningKicker: "Dining",
    diningTitle: "Fire, wine, wood, and long conversations.",
    diningText:
      "The table at Aurora is intimate and seasonal. Vegetables are pulled from nearby gardens, meat is cooked slowly over embers, and every dinner is paired with small-production wines from Mendoza.",
    finalKicker: "Private stays · Limited seasons",
    finalTitle: "Escape the ordinary.",
    finalText:
      "Step away from speed and into silence, wine, mountains, and the generous emptiness of the countryside.",
    reserve: "Reserve your stay",
    footerPlace: "Aurora · Mendoza, Argentina",
  },
  es: {
    nav: ["Experiencia", "Galería", "Suites", "Reservar"],
    inquire: "Consultar",
    loader: "Retiro de estancia",
    coordinates: "Mendoza, Argentina · 33.0° S / 68.8° O",
    heroTitle: "Un refugio en el corazón de Mendoza.",
    heroSubtitle: "Silencio. Vino. Aire de montaña.",
    scroll: "Bajar",
    experienceLabel: "Vida lenta",
    experienceKicker: "La experiencia",
    experienceTitle:
      "Una estancia apartada, definida por arquitectura serena, viñas antiguas y el ritmo de los Andes.",
    experienceText:
      "Aurora no está pensada desde la urgencia. Los días avanzan despacio: el fuego antes del desayuno, caballos cruzando la mañana, almuerzos bajo sombra filtrada y noches servidas en copas profundas de Malbec mientras la montaña se vuelve azul.",
    experiences: [
      "Cabalgatas al amanecer",
      "Degustaciones privadas entre viñas",
      "Cenas al fuego bajo las estrellas",
      "Baños exteriores frente a los Andes",
      "Mañanas silenciosas de montaña",
      "Atardeceres lentos a la luz de las velas",
    ],
    galleryKicker: "Diario visual",
    galleryTitle: "Paisajes, texturas, rituales.",
    galleryText: "Un archivo cinematográfico de viñas, piedra, fuego, lino y silencio.",
    gallery: ["Viñas antiguas", "Interiores de piedra", "Fuego abierto", "Cabalgatas", "Cultura del vino", "Rituales exteriores"],
    suitesKicker: "Habitaciones / Suites",
    suitesTitle:
      "Habitaciones privadas compuestas con calma, calidez y luz de montaña.",
    suites: [
      {
        name: "Suite Andes",
        text: "Un refugio privado de piedra, lino y luz matinal con vistas abiertas a la montaña.",
        detail: "72 m² · terraza privada",
      },
      {
        name: "Habitación Tierra",
        text: "Interiores terrosos, calma escultórica y una bañera profunda abierta al jardín.",
        detail: "48 m² · baño al jardín",
      },
      {
        name: "Residencia Sol",
        text: "Una residencia independiente para almuerzos largos, tardes lentas y silencio dorado.",
        detail: "110 m² · patio con fuego",
      },
    ],
    locationKicker: "Ubicación",
    locationTitle:
      "Al pie de los Andes, a solo 40 minutos de la ciudad de Mendoza.",
    mapLabel: "Mapa mínimo",
    mapText: "Campo mendocino / horizonte andino",
    diningKicker: "Gastronomía",
    diningTitle: "Fuego, vino, madera y conversaciones largas.",
    diningText:
      "La mesa de Aurora es íntima y estacional. Verduras de huertas cercanas, carnes cocidas lentamente sobre brasas y cenas acompañadas por vinos de pequeña producción mendocina.",
    finalKicker: "Estadías privadas · Temporadas limitadas",
    finalTitle: "Escapá de lo ordinario.",
    finalText:
      "Alejate de la velocidad y entrá en el silencio, el vino, las montañas y la amplitud generosa del campo.",
    reserve: "Reservar estadía",
    footerPlace: "Aurora · Mendoza, Argentina",
  },
  pt: {
    nav: ["Experiência", "Galeria", "Suítes", "Reservar"],
    inquire: "Consultar",
    loader: "Retiro de estância",
    coordinates: "Mendoza, Argentina · 33.0° S / 68.8° O",
    heroTitle: "Um refúgio no coração de Mendoza.",
    heroSubtitle: "Silêncio. Vinho. Ar de montanha.",
    scroll: "Rolar",
    experienceLabel: "Vida lenta",
    experienceKicker: "A experiência",
    experienceTitle:
      "Uma estância isolada, moldada por arquitetura serena, vinhas antigas e o ritmo dos Andes.",
    experienceText:
      "Aurora não foi pensada a partir da pressa. Os dias passam devagar: o fogo antes do café da manhã, cavalos cruzando a manhã clara, almoços sob sombra filtrada e noites servidas em taças profundas de Malbec enquanto as montanhas se tornam azuis.",
    experiences: [
      "Passeios a cavalo ao amanhecer",
      "Degustações privadas entre vinhas",
      "Jantares no fogo sob as estrelas",
      "Banhos externos diante dos Andes",
      "Manhãs silenciosas de montanha",
      "Noites lentas à luz de velas",
    ],
    galleryKicker: "Diário visual",
    galleryTitle: "Paisagens, texturas, rituais.",
    galleryText: "Um arquivo cinematográfico de vinhas, pedra, fogo, linho e silêncio.",
    gallery: ["Vinhas antigas", "Interiores de pedra", "Fogo aberto", "Passeios matinais", "Cultura do vinho", "Rituais externos"],
    suitesKicker: "Quartos / Suítes",
    suitesTitle:
      "Quartos privados compostos com contenção, calor e luz de montanha.",
    suites: [
      {
        name: "Suíte Andes",
        text: "Um refúgio privado de pedra, linho e luz matinal com vistas abertas para a montanha.",
        detail: "72 m² · terraço privado",
      },
      {
        name: "Quarto Tierra",
        text: "Interiores terrosos, calma escultórica e uma banheira profunda aberta para o jardim.",
        detail: "48 m² · banho no jardim",
      },
      {
        name: "Residência Sol",
        text: "Uma residência independente para almoços longos, tardes lentas e silêncio dourado.",
        detail: "110 m² · pátio com fogo",
      },
    ],
    locationKicker: "Localização",
    locationTitle:
      "No sopé dos Andes, a apenas 40 minutos da cidade de Mendoza.",
    mapLabel: "Mapa mínimo",
    mapText: "Campo de Mendoza / horizonte andino",
    diningKicker: "Gastronomia",
    diningTitle: "Fogo, vinho, madeira e longas conversas.",
    diningText:
      "A mesa de Aurora é íntima e sazonal. Vegetais de hortas próximas, carnes cozidas lentamente sobre brasas e jantares harmonizados com vinhos de pequena produção de Mendoza.",
    finalKicker: "Estadias privadas · Temporadas limitadas",
    finalTitle: "Fuja do comum.",
    finalText:
      "Afaste-se da velocidade e entre no silêncio, no vinho, nas montanhas e na amplitude generosa do campo.",
    reserve: "Reservar estadia",
    footerPlace: "Aurora · Mendoza, Argentina",
  },
};

const suiteImages = [images.mountains, images.interior, images.architecture];
const galleryImages = [images.vineyard, images.interior, images.fire, images.horses, images.table, images.bath];

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionKicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-5 text-[11px] uppercase tracking-[0.34em] text-[color:var(--gold)]">
      {children}
    </p>
  );
}

function BackgroundImage({
  src,
  className = "",
}: {
  src: string;
  className?: string;
}) {
  return (
    <div
      className={`image-cover ${className}`}
      style={{ backgroundImage: `url(${src})` }}
    />
  );
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [showLoader, setShowLoader] = useState(true);
  const t = copy[language];
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.35], ["0%", "18%"]);
  const heroScale = useTransform(scrollYProgress, [0, 0.35], [1.05, 1.16]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => setShowLoader(false), 2100);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <main className="grain bg-[color:var(--cream)] text-[color:var(--brown)]">
      {showLoader ? (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.1, delay: 0.7, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[color:var(--charcoal)] text-[color:var(--cream)]"
        >
          <div className="text-center">
            <p className="mb-4 text-[11px] uppercase tracking-[0.5em] text-[color:var(--gold)]">
              {t.loader}
            </p>
            <h1 className="font-display text-6xl tracking-wide md:text-8xl">
              Aurora
            </h1>
          </div>
        </motion.div>
      ) : null}

      <nav className="fixed left-0 top-0 z-50 flex w-full items-center justify-between px-6 py-5 text-[color:var(--cream)] md:px-10">
        <a href="#home" className="font-display text-2xl tracking-[0.18em]">
          Aurora
        </a>
        <div className="hidden items-center gap-8 text-[11px] uppercase tracking-[0.26em] md:flex">
          <a href="#experience" className="transition hover:text-[color:var(--sand)]">
            {t.nav[0]}
          </a>
          <a href="#gallery" className="transition hover:text-[color:var(--sand)]">
            {t.nav[1]}
          </a>
          <a href="#suites" className="transition hover:text-[color:var(--sand)]">
            {t.nav[2]}
          </a>
          <a href="#reserve" className="transition hover:text-[color:var(--sand)]">
            {t.nav[3]}
          </a>
        </div>
        <div className="flex items-center gap-2 border border-white/20 bg-black/15 p-1 backdrop-blur-md">
          {languageOptions.map((option) => (
            <button
              key={option.code}
              type="button"
              onClick={() => setLanguage(option.code)}
              aria-label={option.label}
              className={`flex h-8 w-8 items-center justify-center text-base transition ${
                language === option.code ? "bg-white text-black" : "text-white/75 hover:bg-white/10"
              }`}
            >
              {option.flag}
            </button>
          ))}
        </div>
        <a
          href="#reserve"
          className="hidden border border-white/35 px-4 py-2 text-[10px] uppercase tracking-[0.24em] transition hover:bg-white hover:text-[color:var(--brown)] sm:inline-flex"
        >
          {t.inquire}
        </a>
      </nav>

      <section id="home" className="relative min-h-screen overflow-hidden bg-black">
        <motion.div
          style={{ y: heroY, scale: heroScale }}
          className="absolute inset-0"
        >
          <BackgroundImage src={images.hero} className="h-full w-full opacity-80" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-black/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,.55)_100%)]" />
        <div className="relative z-10 flex min-h-screen flex-col justify-end px-6 pb-14 text-[color:var(--cream)] md:px-12 md:pb-20">
          <FadeIn>
            <p className="mb-6 max-w-xl text-[11px] uppercase tracking-[0.42em] text-[color:var(--sand)]">
              {t.coordinates}
            </p>
            <h1 className="font-display max-w-5xl text-balance text-6xl font-medium leading-[0.9] tracking-[-0.03em] md:text-8xl lg:text-[9rem]">
              {t.heroTitle}
            </h1>
          </FadeIn>
          <FadeIn delay={0.18} className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-lg text-xl font-light leading-relaxed text-white/80 md:text-2xl">
              {t.heroSubtitle}
            </p>
            <a
              href="#experience"
              className="group inline-flex w-fit items-center gap-4 text-[11px] uppercase tracking-[0.34em] text-white/70"
            >
              {t.scroll}
              <span className="h-px w-16 bg-white/45 transition group-hover:w-24" />
            </a>
          </FadeIn>
        </div>
      </section>

      <section id="experience" className="px-6 py-24 md:px-12 md:py-36">
        <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-[0.8fr_1.2fr]">
          <FadeIn className="flex gap-8">
            <p className="vertical-label text-[11px] uppercase tracking-[0.38em] text-[color:var(--gold)]">
              {t.experienceLabel}
            </p>
            <div>
              <SectionKicker>{t.experienceKicker}</SectionKicker>
              <h2 className="font-display text-balance text-5xl leading-[0.95] tracking-[-0.03em] md:text-7xl">
                {t.experienceTitle}
              </h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.14} className="space-y-10">
            <p className="max-w-2xl text-lg font-light leading-[1.9] text-[color:var(--brown)]/75 md:text-xl">
              {t.experienceText}
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {t.experiences.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.055, duration: 0.8 }}
                  className="border-t border-[color:var(--brown)]/15 py-4 text-sm uppercase tracking-[0.18em] text-[color:var(--brown)]/70"
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
        <div className="mx-auto mt-20 grid max-w-7xl gap-6 md:grid-cols-[1.1fr_0.7fr] md:items-end">
          <FadeIn>
            <BackgroundImage
              src={images.horses}
              className="h-[70vh] min-h-[480px] w-full"
            />
          </FadeIn>
          <FadeIn delay={0.12}>
            <BackgroundImage
              src={images.bath}
              className="h-[420px] w-full md:-mb-16"
            />
          </FadeIn>
        </div>
      </section>

      <section id="gallery" className="bg-[color:var(--charcoal)] px-6 py-24 text-[color:var(--cream)] md:px-12 md:py-36">
        <div className="mx-auto max-w-7xl">
          <FadeIn className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <SectionKicker>{t.galleryKicker}</SectionKicker>
              <h2 className="font-display text-5xl leading-none tracking-[-0.03em] md:text-7xl">
                {t.galleryTitle}
              </h2>
            </div>
            <p className="max-w-sm text-sm uppercase leading-loose tracking-[0.22em] text-white/45">
              {t.galleryText}
            </p>
          </FadeIn>
          <div className="grid auto-rows-[260px] gap-4 md:grid-cols-4 md:auto-rows-[320px]">
            {t.gallery.map((label, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.9, delay: index * 0.08 }}
                className={`group relative overflow-hidden ${
                  index === 0 || index === 5 ? "md:col-span-2 md:row-span-2" : ""
                }`}
              >
                <BackgroundImage
                  src={galleryImages[index]}
                  className="h-full w-full scale-105 transition duration-[1800ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent opacity-75" />
                <p className="absolute bottom-5 left-5 text-[11px] uppercase tracking-[0.28em] text-white/80">
                  {label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="suites" className="px-6 py-24 md:px-12 md:py-36">
        <div className="mx-auto max-w-7xl">
          <FadeIn className="mb-16 max-w-4xl">
            <SectionKicker>{t.suitesKicker}</SectionKicker>
            <h2 className="font-display text-balance text-5xl leading-[0.95] tracking-[-0.03em] md:text-7xl">
              {t.suitesTitle}
            </h2>
          </FadeIn>
          <div className="grid gap-10 md:grid-cols-3">
            {t.suites.map((suite, index) => (
              <FadeIn key={suite.name} delay={index * 0.08}>
                <article className="group">
                  <div className="mb-6 h-[430px] overflow-hidden bg-[color:var(--brown)]">
                    <BackgroundImage
                      src={suiteImages[index]}
                      className="h-full w-full scale-105 transition duration-[1600ms] group-hover:scale-110"
                    />
                  </div>
                  <p className="mb-3 text-[10px] uppercase tracking-[0.28em] text-[color:var(--gold)]">
                    {suite.detail}
                  </p>
                  <h3 className="font-display text-4xl">{suite.name}</h3>
                  <p className="mt-4 font-light leading-relaxed text-[color:var(--brown)]/70">
                    {suite.text}
                  </p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[color:var(--sand)] px-6 py-24 md:px-12 md:py-36">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <FadeIn>
            <SectionKicker>{t.locationKicker}</SectionKicker>
            <h2 className="font-display text-5xl leading-none tracking-[-0.03em] md:text-7xl">
              {t.locationTitle}
            </h2>
            <div className="mt-10 grid gap-4 text-sm uppercase tracking-[0.2em] text-[color:var(--brown)]/70 sm:grid-cols-2">
              <p>33.0167° S</p>
              <p>68.8667° W</p>
              <p>Uco Valley road</p>
              <p>900m above sea level</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.12}>
            <div className="relative h-[560px] overflow-hidden">
              <BackgroundImage src={images.mountains} className="h-full w-full" />
              <div className="absolute inset-8 border border-white/45" />
              <div className="absolute bottom-8 left-8 max-w-xs bg-[color:var(--cream)]/90 p-6 backdrop-blur">
                <p className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--gold)]">
                  {t.mapLabel}
                </p>
                <p className="mt-4 font-display text-3xl leading-none">
                  {t.mapText}
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-[color:var(--brown)] px-6 py-24 text-[color:var(--cream)] md:px-12 md:py-36">
        <div className="mx-auto grid max-w-7xl gap-14 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <FadeIn>
            <BackgroundImage src={images.fire} className="h-[680px] w-full" />
          </FadeIn>
          <FadeIn delay={0.15}>
            <SectionKicker>{t.diningKicker}</SectionKicker>
            <h2 className="font-display text-5xl leading-[0.95] tracking-[-0.03em] md:text-7xl">
              {t.diningTitle}
            </h2>
            <p className="mt-8 max-w-xl text-lg font-light leading-[1.9] text-white/70">
              {t.diningText}
            </p>
          </FadeIn>
        </div>
      </section>

      <section id="reserve" className="relative min-h-screen overflow-hidden bg-black">
        <BackgroundImage
          src={images.table}
          className="absolute inset-0 h-full w-full opacity-65"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/75" />
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center text-[color:var(--cream)]">
          <FadeIn>
            <p className="mb-6 text-[11px] uppercase tracking-[0.42em] text-[color:var(--sand)]">
              {t.finalKicker}
            </p>
            <h2 className="font-display text-balance text-6xl leading-[0.9] tracking-[-0.03em] md:text-8xl">
              {t.finalTitle}
            </h2>
            <p className="mx-auto mt-8 max-w-xl text-lg font-light leading-relaxed text-white/75">
              {t.finalText}
            </p>
            <a
              href="mailto:reservations@auroraretreat.com"
              className="mt-10 inline-flex border border-white/40 px-8 py-4 text-[11px] uppercase tracking-[0.28em] transition hover:bg-white hover:text-[color:var(--brown)]"
            >
              {t.reserve}
            </a>
          </FadeIn>
        </div>
        <footer className="absolute bottom-0 left-0 z-20 flex w-full flex-col gap-4 px-6 py-8 text-[10px] uppercase tracking-[0.24em] text-white/45 md:flex-row md:items-center md:justify-between md:px-12">
          <p>{t.footerPlace}</p>
          <p>{t.heroSubtitle}</p>
        </footer>
      </section>
      </main>
  );
}
