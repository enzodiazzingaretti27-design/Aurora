/** Utilidades de fecha sin dependencias externas. Trabajan con fechas locales
 *  parseadas desde strings YYYY-MM-DD para evitar corrimientos por zona horaria. */

export function parseDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function addMonths(date: Date, months: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/** Cantidad de noches entre check-in y check-out. */
export function nightsBetween(checkIn: string, checkOut: string): number {
  const ms = parseDate(checkOut).getTime() - parseDate(checkIn).getTime();
  return Math.round(ms / (1000 * 60 * 60 * 24));
}

/** ¿La reserva [checkIn, checkOut) ocupa el día `day`? (el día de salida queda libre) */
export function occupiesDay(checkIn: string, checkOut: string, day: Date): boolean {
  const t = day.getTime();
  return t >= parseDate(checkIn).getTime() && t < parseDate(checkOut).getTime();
}

/** Grilla de 6 semanas (42 días) que empieza el lunes, para pintar un mes. */
export function monthGrid(year: number, month: number): Date[] {
  const first = new Date(year, month, 1);
  // getDay(): 0=domingo … 6=sábado. Queremos que la semana empiece el lunes.
  const offset = (first.getDay() + 6) % 7;
  const start = addDays(first, -offset);
  return Array.from({ length: 42 }, (_, i) => addDays(start, i));
}

const MONTHS_ES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

export function monthLabel(year: number, month: number): string {
  return `${MONTHS_ES[month]} ${year}`;
}

export const WEEKDAYS_ES = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

export function formatDateShort(iso: string): string {
  const d = parseDate(iso);
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;
}
