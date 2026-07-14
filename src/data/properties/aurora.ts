import type { PropertyData } from "@/types/property";

export const auroraProperty: PropertyData = {
  slug: "aurora",
  brandName: "Aurora",
  reserveEmail: "reservations@auroraretreat.com",
  // TODO: reemplazar por el WhatsApp real de Cecilia (código país + área, solo dígitos).
  whatsappNumber: "5492610000000",
  locationDetails: ["33.0167° S", "68.8667° W", "Uco Valley road", "900m above sea level"],
  images: {
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
  },
  copy: {
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
  },
};
