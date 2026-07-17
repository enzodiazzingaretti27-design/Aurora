import type { PropertyData } from "@/types/property";

// Alto Dique Potrerillos — Potrerillos, Luján de Cuyo, Mendoza.
//
// La GEOGRAFÍA de este archivo es real y verificable: el embalse sobre el río
// Mendoza, la precordillera, el Cordón del Plata, ~1.400 m, la RN7 camino a la
// alta montaña, Vallecitos. Los textos están escritos sobre esos hechos.
//
// TODO (a confirmar con Cecilia): fotos reales, nombre/cantidad de ambientes
// (la sección `suites` es borrador), qué hay en la casa (pileta, parrilla,
// wifi, cochera, mascotas) y el WhatsApp de contacto. Las imágenes de abajo son
// placeholders (picsum.photos), no fotos de la propiedad.
export const potrerillosProperty: PropertyData = {
  slug: "potrerillos",
  brandName: "Alto Dique Potrerillos",
  shortName: "Potrerillos",
  reserveEmail: "reservas@example.com",
  // TODO: reemplazar por el WhatsApp real (solo dígitos, con código de país).
  whatsappNumber: "5492610000000",
  locationDetails: [
    "32.98° S",
    "69.20° O",
    "Ruta Nacional 7",
    "1.400 m sobre el nivel del mar",
  ],
  images: {
    hero: "https://picsum.photos/seed/potrerillos-hero/2400/1600",
    mountains: "https://picsum.photos/seed/potrerillos-cordon/1800/1200",
    vineyard: "https://picsum.photos/seed/potrerillos-embalse/1800/1200",
    interior: "https://picsum.photos/seed/potrerillos-interior/1800/1200",
    fire: "https://picsum.photos/seed/potrerillos-fuego/1800/1200",
    horses: "https://picsum.photos/seed/potrerillos-montana/1800/1200",
    table: "https://picsum.photos/seed/potrerillos-mesa/1800/1200",
    bath: "https://picsum.photos/seed/potrerillos-bano/1800/1200",
    architecture: "https://picsum.photos/seed/potrerillos-arquitectura/1800/1200",
  },
  copy: {
    en: {
      nav: ["Experience", "Gallery", "Rooms", "Reserve"],
      inquire: "Inquire",
      loader: "Potrerillos, Mendoza",
      coordinates: "Potrerillos, Mendoza · 32.98° S / 69.20° W",
      heroTitle: "Above the reservoir, held by the Andes.",
      heroSubtitle: "Water. Mountain. Open sky.",
      scroll: "Scroll",
      experienceLabel: "Mountain",
      experienceKicker: "The experience",
      experienceTitle:
        "A house above the Potrerillos reservoir, facing the Cordón del Plata.",
      experienceText:
        "Potrerillos is where the Mendoza river slows into turquoise water and the pre-cordillera rises on every side. Days here follow the light: the water flat and bright in the morning, the mountains going copper in the afternoon, and a sky so clear at night that the stars feel close.",
      experiences: [
        "Kayak and sailing on the reservoir",
        "Trekking in the pre-cordillera",
        "Rafting on the Mendoza river",
        "Vallecitos and the snow in winter",
        "The high mountain road to Aconcagua",
        "Nights under a clear Mendoza sky",
      ],
      galleryKicker: "Visual journal",
      galleryTitle: "Water, stone, altitude.",
      galleryText: "Turquoise water, dry mountain, poplars, and long light.",
      gallery: [
        "The reservoir",
        "Cordón del Plata",
        "Open fire",
        "Mountain mornings",
        "Poplars and wind",
        "Clear nights",
      ],
      suitesKicker: "Rooms",
      suitesTitle: "Rooms facing the water and the mountain.",
      // TODO: borrador — reemplazar por los ambientes reales de la casa.
      suites: [
        {
          name: "Reservoir view",
          text: "Details to be confirmed with the owner.",
          detail: "To be confirmed",
        },
        {
          name: "Mountain side",
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
        "One hour from Mendoza city, on the road to the high mountains.",
      mapLabel: "Where it is",
      mapText: "Potrerillos reservoir / Cordón del Plata",
      diningKicker: "The table",
      diningTitle: "Fire, altitude, and long evenings.",
      diningText:
        "An hour from the city and far from its noise, the table here is about what the region does best: meat over embers, Mendoza wine, and the light dropping behind the Cordón del Plata while dinner takes its time.",
      finalKicker: "Potrerillos · Mendoza",
      finalTitle: "Come up to the mountain.",
      finalText:
        "The reservoir, the pre-cordillera, and the kind of silence that only exists at altitude — an hour from Mendoza city.",
      reserve: "Check availability",
      footerPlace: "Alto Dique Potrerillos · Mendoza, Argentina",
    },
    es: {
      nav: ["Experiencia", "Galería", "Ambientes", "Reservar"],
      inquire: "Consultar",
      loader: "Potrerillos, Mendoza",
      coordinates: "Potrerillos, Mendoza · 32.98° S / 69.20° O",
      heroTitle: "Sobre el dique, entre montañas.",
      heroSubtitle: "Agua. Montaña. Cielo abierto.",
      scroll: "Bajar",
      experienceLabel: "Montaña",
      experienceKicker: "La experiencia",
      experienceTitle:
        "Una casa sobre el dique de Potrerillos, frente al Cordón del Plata.",
      experienceText:
        "Potrerillos es donde el río Mendoza se abre en agua turquesa y la precordillera se levanta de todos lados. Acá los días siguen a la luz: el agua quieta y brillante a la mañana, la montaña cobriza a la tarde, y un cielo tan limpio de noche que las estrellas parecen cerca.",
      experiences: [
        "Kayak y vela en el embalse",
        "Trekking en la precordillera",
        "Rafting en el río Mendoza",
        "Vallecitos y la nieve en invierno",
        "El camino de alta montaña al Aconcagua",
        "Noches bajo el cielo limpio de Mendoza",
      ],
      galleryKicker: "Diario visual",
      galleryTitle: "Agua, piedra, altura.",
      galleryText: "Agua turquesa, montaña seca, álamos y luz larga.",
      gallery: [
        "El embalse",
        "Cordón del Plata",
        "Fuego abierto",
        "Mañanas de montaña",
        "Álamos y viento",
        "Noches limpias",
      ],
      suitesKicker: "Ambientes",
      suitesTitle: "Ambientes frente al agua y la montaña.",
      // TODO: borrador — reemplazar por los ambientes reales de la casa.
      suites: [
        {
          name: "Vista al dique",
          text: "Detalles a confirmar con la propietaria.",
          detail: "A confirmar",
        },
        {
          name: "Lado montaña",
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
        "A una hora de la ciudad de Mendoza, sobre la ruta a la alta montaña.",
      mapLabel: "Dónde queda",
      mapText: "Dique de Potrerillos / Cordón del Plata",
      diningKicker: "La mesa",
      diningTitle: "Fuego, altura y noches largas.",
      diningText:
        "A una hora de la ciudad y lejos de su ruido, la mesa acá es lo que la región hace mejor: carne sobre las brasas, vino mendocino, y la luz cayendo detrás del Cordón del Plata mientras la cena se toma su tiempo.",
      finalKicker: "Potrerillos · Mendoza",
      finalTitle: "Subí a la montaña.",
      finalText:
        "El dique, la precordillera y ese silencio que solo existe en altura — a una hora de la ciudad de Mendoza.",
      reserve: "Consultar disponibilidad",
      footerPlace: "Alto Dique Potrerillos · Mendoza, Argentina",
    },
    pt: {
      nav: ["Experiência", "Galeria", "Ambientes", "Reservar"],
      inquire: "Consultar",
      loader: "Potrerillos, Mendoza",
      coordinates: "Potrerillos, Mendoza · 32.98° S / 69.20° O",
      heroTitle: "Sobre a represa, entre montanhas.",
      heroSubtitle: "Água. Montanha. Céu aberto.",
      scroll: "Rolar",
      experienceLabel: "Montanha",
      experienceKicker: "A experiência",
      experienceTitle:
        "Uma casa sobre a represa de Potrerillos, de frente para o Cordón del Plata.",
      experienceText:
        "Potrerillos é onde o rio Mendoza se abre em água turquesa e a pré-cordilheira se levanta por todos os lados. Aqui os dias seguem a luz: a água parada e brilhante de manhã, a montanha acobreada à tarde, e um céu tão limpo à noite que as estrelas parecem perto.",
      experiences: [
        "Caiaque e vela na represa",
        "Trekking na pré-cordilheira",
        "Rafting no rio Mendoza",
        "Vallecitos e a neve no inverno",
        "A estrada de alta montanha ao Aconcágua",
        "Noites sob o céu limpo de Mendoza",
      ],
      galleryKicker: "Diário visual",
      galleryTitle: "Água, pedra, altitude.",
      galleryText: "Água turquesa, montanha seca, álamos e luz longa.",
      gallery: [
        "A represa",
        "Cordón del Plata",
        "Fogo aberto",
        "Manhãs de montanha",
        "Álamos e vento",
        "Noites limpas",
      ],
      suitesKicker: "Ambientes",
      suitesTitle: "Ambientes de frente para a água e a montanha.",
      // TODO: borrador — reemplazar por los ambientes reales de la casa.
      suites: [
        {
          name: "Vista para a represa",
          text: "Detalhes a confirmar com a proprietária.",
          detail: "A confirmar",
        },
        {
          name: "Lado montanha",
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
        "A uma hora da cidade de Mendoza, na estrada para a alta montanha.",
      mapLabel: "Onde fica",
      mapText: "Represa de Potrerillos / Cordón del Plata",
      diningKicker: "A mesa",
      diningTitle: "Fogo, altitude e noites longas.",
      diningText:
        "A uma hora da cidade e longe do seu barulho, a mesa aqui é o que a região faz melhor: carne sobre as brasas, vinho de Mendoza, e a luz caindo atrás do Cordón del Plata enquanto o jantar leva seu tempo.",
      finalKicker: "Potrerillos · Mendoza",
      finalTitle: "Suba à montanha.",
      finalText:
        "A represa, a pré-cordilheira e aquele silêncio que só existe na altitude — a uma hora da cidade de Mendoza.",
      reserve: "Consultar disponibilidade",
      footerPlace: "Alto Dique Potrerillos · Mendoza, Argentina",
    },
  },
};
