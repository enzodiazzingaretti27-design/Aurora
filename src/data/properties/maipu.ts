import type { PropertyData } from "@/types/property";

// Casa en Maipú, Mendoza.
//
// La GEOGRAFÍA de este archivo es real y verificable: Maipú es la cuna histórica
// del Malbec mendocino, está a ~16 km (20-25 min) de la ciudad de Mendoza, a
// ~750 m, rodeada de bodegas, olivares y acequias, con los Andes en el horizonte.
// Los textos hablan de la ZONA (que es cierta), no de lo que hay dentro de la
// casa, para no prometer nada que no podamos cumplir.
//
// TODO (a confirmar con Cecilia): el NOMBRE real de esta casa (hoy es un
// placeholder), fotos reales, ambientes (la sección `suites` es borrador), qué
// tiene (pileta, parrilla, wifi, cochera, mascotas) y el WhatsApp de contacto.
export const maipuProperty: PropertyData = {
  slug: "maipu",
  brandName: "Casa Maipú",
  shortName: "Maipú",
  reserveEmail: "reservas@example.com",
  // TODO: reemplazar por el WhatsApp real (solo dígitos, con código de país).
  whatsappNumber: "5492610000000",
  locationDetails: [
    "32.98° S",
    "68.79° O",
    "Maipú, Mendoza",
    "750 m sobre el nivel del mar",
  ],
  images: {
    hero: "https://picsum.photos/seed/maipu-hero/2400/1600",
    mountains: "https://picsum.photos/seed/maipu-andes/1800/1200",
    vineyard: "https://picsum.photos/seed/maipu-vinedo/1800/1200",
    interior: "https://picsum.photos/seed/maipu-interior/1800/1200",
    fire: "https://picsum.photos/seed/maipu-fuego/1800/1200",
    horses: "https://picsum.photos/seed/maipu-olivares/1800/1200",
    table: "https://picsum.photos/seed/maipu-mesa/1800/1200",
    bath: "https://picsum.photos/seed/maipu-bano/1800/1200",
    architecture: "https://picsum.photos/seed/maipu-arquitectura/1800/1200",
  },
  copy: {
    en: {
      nav: ["Experience", "Gallery", "Rooms", "Reserve"],
      inquire: "Inquire",
      loader: "Maipú, Mendoza",
      coordinates: "Maipú, Mendoza · 32.98° S / 68.79° W",
      heroTitle: "In the cradle of Malbec.",
      heroSubtitle: "Wine. Olive groves. Sun.",
      scroll: "Scroll",
      experienceLabel: "Wine country",
      experienceKicker: "The experience",
      experienceTitle:
        "A house in Maipú, where Mendoza's Malbec was born — twenty minutes from the city.",
      experienceText:
        "Maipú is the oldest wine district in Mendoza: the place where Malbec took hold and never left. Vineyards, olive groves and poplar-lined roads run between century-old wineries, the Andes sit on the horizon, and the city is close enough that you are never choosing between the countryside and everything else.",
      experiences: [
        "Historic wineries a few minutes away",
        "The classic bikes-and-wine circuit",
        "Olive groves and local olive oil",
        "Long sunlit afternoons",
        "The Andes on the horizon",
        "Mendoza city, twenty minutes away",
      ],
      galleryKicker: "Visual journal",
      galleryTitle: "Vines, poplars, sun.",
      galleryText: "Old vineyards, irrigation channels, olive trees, and warm light.",
      gallery: [
        "Vineyards",
        "Andes horizon",
        "Open fire",
        "Olive groves",
        "Wine country",
        "Warm afternoons",
      ],
      suitesKicker: "Rooms",
      suitesTitle: "Rooms with the calm of the vineyards.",
      // TODO: borrador — reemplazar por los ambientes reales de la casa.
      suites: [
        {
          name: "Main room",
          text: "Details to be confirmed with the owner.",
          detail: "To be confirmed",
        },
        {
          name: "Garden room",
          text: "Details to be confirmed with the owner.",
          detail: "To be confirmed",
        },
        {
          name: "Living area",
          text: "Details to be confirmed with the owner.",
          detail: "To be confirmed",
        },
      ],
      locationKicker: "Location",
      locationTitle:
        "In Maipú, twenty minutes from Mendoza city, surrounded by wineries.",
      mapLabel: "Where it is",
      mapText: "Maipú / Mendoza wine country",
      diningKicker: "The table",
      diningTitle: "Malbec, embers, and unhurried lunches.",
      diningText:
        "You are in the middle of Mendoza's oldest wine country: the wineries are a few minutes away, the olive oil is made down the road, and the afternoon is long enough for a lunch that runs into the evening.",
      finalKicker: "Maipú · Mendoza",
      finalTitle: "Stay among the vines.",
      finalText:
        "Wine country on one side, the city twenty minutes on the other, and the Andes closing the horizon.",
      reserve: "Check availability",
      footerPlace: "Casa Maipú · Mendoza, Argentina",
    },
    es: {
      nav: ["Experiencia", "Galería", "Ambientes", "Reservar"],
      inquire: "Consultar",
      loader: "Maipú, Mendoza",
      coordinates: "Maipú, Mendoza · 32.98° S / 68.79° O",
      heroTitle: "En la cuna del Malbec.",
      heroSubtitle: "Vino. Olivares. Sol.",
      scroll: "Bajar",
      experienceLabel: "Tierra del vino",
      experienceKicker: "La experiencia",
      experienceTitle:
        "Una casa en Maipú, donde nació el Malbec mendocino — a veinte minutos de la ciudad.",
      experienceText:
        "Maipú es la zona vitivinícola más antigua de Mendoza: donde el Malbec se afincó y nunca se fue. Entre bodegas centenarias corren viñedos, olivares y calles de álamos, los Andes cierran el horizonte, y la ciudad queda lo bastante cerca como para no tener que elegir entre el campo y todo lo demás.",
      experiences: [
        "Bodegas históricas a minutos",
        "El clásico circuito de bicis y vino",
        "Olivares y aceite de oliva de la zona",
        "Tardes largas de sol",
        "Los Andes en el horizonte",
        "La ciudad de Mendoza, a veinte minutos",
      ],
      galleryKicker: "Diario visual",
      galleryTitle: "Viñas, álamos, sol.",
      galleryText: "Viñedos antiguos, acequias, olivos y luz cálida.",
      gallery: [
        "Viñedos",
        "Horizonte andino",
        "Fuego abierto",
        "Olivares",
        "Tierra del vino",
        "Tardes cálidas",
      ],
      suitesKicker: "Ambientes",
      suitesTitle: "Ambientes con la calma de los viñedos.",
      // TODO: borrador — reemplazar por los ambientes reales de la casa.
      suites: [
        {
          name: "Habitación principal",
          text: "Detalles a confirmar con la propietaria.",
          detail: "A confirmar",
        },
        {
          name: "Habitación al jardín",
          text: "Detalles a confirmar con la propietaria.",
          detail: "A confirmar",
        },
        {
          name: "Living",
          text: "Detalles a confirmar con la propietaria.",
          detail: "A confirmar",
        },
      ],
      locationKicker: "Ubicación",
      locationTitle:
        "En Maipú, a veinte minutos de la ciudad de Mendoza, rodeada de bodegas.",
      mapLabel: "Dónde queda",
      mapText: "Maipú / tierra del vino mendocina",
      diningKicker: "La mesa",
      diningTitle: "Malbec, brasas y almuerzos sin apuro.",
      diningText:
        "Estás en el corazón de la zona vitivinícola más antigua de Mendoza: las bodegas quedan a minutos, el aceite de oliva se hace a la vuelta, y la tarde da para un almuerzo que se estira hasta la noche.",
      finalKicker: "Maipú · Mendoza",
      finalTitle: "Quedate entre las viñas.",
      finalText:
        "La tierra del vino de un lado, la ciudad a veinte minutos del otro, y los Andes cerrando el horizonte.",
      reserve: "Consultar disponibilidad",
      footerPlace: "Casa Maipú · Mendoza, Argentina",
    },
    pt: {
      nav: ["Experiência", "Galeria", "Ambientes", "Reservar"],
      inquire: "Consultar",
      loader: "Maipú, Mendoza",
      coordinates: "Maipú, Mendoza · 32.98° S / 68.79° O",
      heroTitle: "No berço do Malbec.",
      heroSubtitle: "Vinho. Oliveiras. Sol.",
      scroll: "Rolar",
      experienceLabel: "Terra do vinho",
      experienceKicker: "A experiência",
      experienceTitle:
        "Uma casa em Maipú, onde nasceu o Malbec de Mendoza — a vinte minutos da cidade.",
      experienceText:
        "Maipú é a região vinícola mais antiga de Mendoza: onde o Malbec se firmou e nunca mais saiu. Entre vinícolas centenárias correm vinhedos, olivais e ruas de álamos, os Andes fecham o horizonte, e a cidade fica perto o suficiente para você não ter que escolher entre o campo e todo o resto.",
      experiences: [
        "Vinícolas históricas a minutos",
        "O clássico circuito de bike e vinho",
        "Olivais e azeite da região",
        "Tardes longas de sol",
        "Os Andes no horizonte",
        "A cidade de Mendoza, a vinte minutos",
      ],
      galleryKicker: "Diário visual",
      galleryTitle: "Vinhas, álamos, sol.",
      galleryText: "Vinhedos antigos, canais de irrigação, oliveiras e luz quente.",
      gallery: [
        "Vinhedos",
        "Horizonte andino",
        "Fogo aberto",
        "Olivais",
        "Terra do vinho",
        "Tardes quentes",
      ],
      suitesKicker: "Ambientes",
      suitesTitle: "Ambientes com a calma dos vinhedos.",
      // TODO: borrador — reemplazar por los ambientes reales de la casa.
      suites: [
        {
          name: "Quarto principal",
          text: "Detalhes a confirmar com a proprietária.",
          detail: "A confirmar",
        },
        {
          name: "Quarto para o jardim",
          text: "Detalhes a confirmar com a proprietária.",
          detail: "A confirmar",
        },
        {
          name: "Living",
          text: "Detalhes a confirmar com a proprietária.",
          detail: "A confirmar",
        },
      ],
      locationKicker: "Localização",
      locationTitle:
        "Em Maipú, a vinte minutos da cidade de Mendoza, cercada de vinícolas.",
      mapLabel: "Onde fica",
      mapText: "Maipú / terra do vinho de Mendoza",
      diningKicker: "A mesa",
      diningTitle: "Malbec, brasas e almoços sem pressa.",
      diningText:
        "Você está no coração da região vinícola mais antiga de Mendoza: as vinícolas ficam a minutos, o azeite é feito ali perto, e a tarde dá para um almoço que se estende até a noite.",
      finalKicker: "Maipú · Mendoza",
      finalTitle: "Fique entre as vinhas.",
      finalText:
        "A terra do vinho de um lado, a cidade a vinte minutos do outro, e os Andes fechando o horizonte.",
      reserve: "Consultar disponibilidade",
      footerPlace: "Casa Maipú · Mendoza, Argentina",
    },
  },
};
