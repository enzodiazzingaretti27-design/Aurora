"use client";

import type { Reservation } from "@/types/reservation";
import { sourceMeta } from "@/types/reservation";
import {
  isSameDay,
  monthGrid,
  occupiesDay,
  WEEKDAYS_ES,
} from "@/lib/dates";

export default function ReservationCalendar({
  year,
  month,
  reservations,
  showProperty = false,
  onSelect,
}: {
  year: number;
  month: number;
  reservations: Reservation[];
  /** Mostrar a qué casa pertenece cada reserva (útil en la vista "ambas"). */
  showProperty?: boolean;
  /** Abrir una reserva al tocarla en el calendario. */
  onSelect?: (reservation: Reservation) => void;
}) {
  const days = monthGrid(year, month);
  const today = new Date();

  return (
    <div className="overflow-hidden rounded-xl border border-black/10 bg-white">
      <div className="grid grid-cols-7 border-b border-black/10 bg-black/[0.03]">
        {WEEKDAYS_ES.map((wd) => (
          <div
            key={wd}
            className="px-2 py-2.5 text-center text-[11px] font-semibold uppercase tracking-[0.15em] text-black/50"
          >
            {wd}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {days.map((day, i) => {
          const inMonth = day.getMonth() === month;
          const isToday = isSameDay(day, today);
          const dayReservations = reservations.filter((r) =>
            occupiesDay(r.checkIn, r.checkOut, day)
          );
          return (
            <div
              key={i}
              className={`min-h-[96px] border-b border-r border-black/[0.06] p-1.5 ${
                inMonth ? "" : "bg-black/[0.02]"
              } ${i % 7 === 6 ? "border-r-0" : ""}`}
            >
              <div
                className={`mb-1 flex h-6 w-6 items-center justify-center rounded-full text-[12px] ${
                  isToday
                    ? "bg-[color:var(--brown)] font-semibold text-white"
                    : inMonth
                      ? "text-black/70"
                      : "text-black/25"
                }`}
              >
                {day.getDate()}
              </div>
              <div className="space-y-0.5">
                {dayReservations.map((r) => {
                  const meta = sourceMeta[r.source];
                  const label = r.guestName ?? `${meta.label} · sin datos`;
                  const aria = `${meta.label} — ${r.guestName ?? "sin datos de huésped"}. Editar.`;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => onSelect?.(r)}
                      aria-label={aria}
                      title={aria}
                      className="block w-full truncate rounded px-1 py-0.5 text-left text-[11px] leading-tight text-white outline-none transition hover:brightness-110 focus:ring-2 focus:ring-black/40"
                      style={{ backgroundColor: meta.color }}
                    >
                      {showProperty && (
                        <span className="opacity-80">
                          {r.propertySlug === "aurora" ? "A · " : "R · "}
                        </span>
                      )}
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
