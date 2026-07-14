import type { PropertySlug } from "@/data/properties";

export type ReservationSource = "airbnb" | "booking" | "direct";

export interface Reservation {
  id: string;
  propertySlug: PropertySlug;
  source: ReservationSource;
  /** Fecha de entrada, formato YYYY-MM-DD (el huésped ocupa desde este día). */
  checkIn: string;
  /** Fecha de salida, formato YYYY-MM-DD (día libre: el huésped se va). */
  checkOut: string;
  /** Datos que se completan a mano (iCal de Airbnb/Booking no los trae). */
  guestName?: string;
  guestPhone?: string;
  amount?: number;
  currency?: string;
  notes?: string;
  /** Id externo del evento iCal, para futuros upserts sin pisar datos manuales. */
  externalId?: string;
}

// Colores con contraste suficiente para texto blanco encima (accesibilidad),
// manteniendo la asociación de marca: rojo Airbnb, azul Booking, ámbar directa.
export const sourceMeta: Record<
  ReservationSource,
  { label: string; color: string }
> = {
  airbnb: { label: "Airbnb", color: "#c0392b" },
  booking: { label: "Booking", color: "#1e4fa0" },
  direct: { label: "Directa", color: "#a16207" },
};

export const reservationSources: ReservationSource[] = [
  "airbnb",
  "booking",
  "direct",
];
