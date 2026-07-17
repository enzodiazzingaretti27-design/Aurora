"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import ReservationCalendar from "@/components/ReservationCalendar";
import ReservationForm, {
  type ReservationDraft,
} from "@/components/ReservationForm";
import { properties, propertySlugs, type PropertySlug } from "@/data/properties";
import { useReservations } from "@/lib/useReservations";
import { sourceMeta } from "@/types/reservation";
import type { Reservation, ReservationSource } from "@/types/reservation";
import {
  addDays,
  addMonths,
  formatDateShort,
  monthLabel,
  nightsBetween,
  parseDate,
  toISODate,
} from "@/lib/dates";

type PropertyFilter = "all" | PropertySlug;

// Hoy a medianoche local, para comparar por día sin que la hora corte reservas.
const today = new Date();
today.setHours(0, 0, 0, 0);

function formatMoney(amount?: number, currency?: string): string {
  if (amount == null) return "—";
  const formatted = new Intl.NumberFormat("es-AR").format(amount);
  return currency ? `$${formatted} ${currency}` : `$${formatted}`;
}

function toDraft(r: Reservation): ReservationDraft {
  return {
    id: r.id,
    propertySlug: r.propertySlug,
    source: r.source,
    checkIn: r.checkIn,
    checkOut: r.checkOut,
    guestName: r.guestName ?? "",
    guestPhone: r.guestPhone ?? "",
    amount: r.amount != null ? String(r.amount) : "",
    currency: r.currency ?? "ARS",
    notes: r.notes ?? "",
  };
}

function newDraft(defaultProperty: PropertySlug): ReservationDraft {
  return {
    id:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `r-${Date.now()}`,
    propertySlug: defaultProperty,
    source: "airbnb",
    checkIn: toISODate(today),
    checkOut: toISODate(addDays(today, 2)),
    guestName: "",
    guestPhone: "",
    amount: "",
    currency: "ARS",
    notes: "",
  };
}

function SourceBadge({ source }: { source: ReservationSource }) {
  const meta = sourceMeta[source];
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[12px] font-medium text-white"
      style={{ backgroundColor: meta.color }}
    >
      {meta.label}
    </span>
  );
}

export default function PanelPage() {
  const { items, upsert, remove, resetToSeed } = useReservations();
  const [filter, setFilter] = useState<PropertyFilter>("all");
  const [cursor, setCursor] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [editing, setEditing] = useState<{
    draft: ReservationDraft;
    isNew: boolean;
  } | null>(null);

  const filtered = useMemo(
    () =>
      filter === "all" ? items : items.filter((r) => r.propertySlug === filter),
    [items, filter]
  );

  const sortedRegistry = useMemo(
    () =>
      [...filtered].sort(
        (a, b) => parseDate(a.checkIn).getTime() - parseDate(b.checkIn).getTime()
      ),
    [filtered]
  );

  const upcoming = sortedRegistry.filter(
    (r) => parseDate(r.checkOut).getTime() >= today.getTime()
  );
  const missingData = filtered.filter((r) => !r.guestName || r.amount == null);

  const year = cursor.getFullYear();
  const month = cursor.getMonth();

  const filterOptions: { value: PropertyFilter; label: string }[] = [
    { value: "all", label: "Ambas casas" },
    ...propertySlugs.map((slug) => ({
      value: slug as PropertyFilter,
      label: properties[slug].brandName,
    })),
  ];

  function openNew() {
    const defaultProperty: PropertySlug =
      filter === "all" ? propertySlugs[0] : filter;
    setEditing({ draft: newDraft(defaultProperty), isNew: true });
  }

  function openEdit(r: Reservation) {
    setEditing({ draft: toDraft(r), isNew: false });
  }

  function handleSave(reservation: Reservation) {
    upsert(reservation);
    setEditing(null);
  }

  function handleDelete(id: string) {
    remove(id);
    setEditing(null);
  }

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/login";
  }

  return (
    <main className="min-h-screen bg-[color:var(--cream)] px-5 py-6 text-[color:var(--brown)] md:px-10 md:py-10">
      <div className="mx-auto max-w-6xl">
        {/* Encabezado */}
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-[11px] uppercase tracking-[0.3em] text-[color:var(--gold)]">
              Panel de reservas
            </p>
            <h1 className="font-display text-4xl leading-none md:text-5xl">
              Calendario y registro
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={openNew}
              className="inline-flex items-center gap-2 rounded-lg bg-[color:var(--brown)] px-5 py-2.5 text-[15px] font-medium text-[color:var(--cream)] shadow-sm transition hover:opacity-90"
            >
              <span className="text-lg leading-none">＋</span> Nueva reserva
            </button>
            <Link
              href="/"
              className="text-[12px] uppercase tracking-[0.2em] text-black/50 transition hover:text-black"
            >
              ← Ver el sitio
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="text-[12px] uppercase tracking-[0.2em] text-black/50 transition hover:text-black"
            >
              Salir
            </button>
          </div>
        </header>

        {/* Aviso de datos de ejemplo */}
        <div className="mb-6 flex flex-col gap-2 rounded-lg border border-[color:var(--gold)]/40 bg-[color:var(--gold)]/10 px-4 py-3 text-sm text-[color:var(--brown)]/80 sm:flex-row sm:items-center sm:justify-between">
          <span>
            Estás viendo <strong>datos de ejemplo</strong>. Tus cambios se guardan
            en este navegador. Cuando conectemos Airbnb y Booking, las reservas van
            a entrar solas.
          </span>
          <button
            type="button"
            onClick={() => {
              if (confirm("¿Restablecer los datos de ejemplo? Se pierden los cambios.")) {
                resetToSeed();
              }
            }}
            className="shrink-0 self-start rounded-md border border-[color:var(--gold)]/50 px-3 py-1 text-[12px] text-[color:var(--brown)]/70 transition hover:bg-[color:var(--gold)]/20 sm:self-auto"
          >
            Restablecer ejemplos
          </button>
        </div>

        {/* Filtro de casa + resumen */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filtrar por casa"
          >
            {filterOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                aria-pressed={filter === opt.value}
                onClick={() => setFilter(opt.value)}
                className={`rounded-full border px-4 py-1.5 text-[14px] transition ${
                  filter === opt.value
                    ? "border-[color:var(--brown)] bg-[color:var(--brown)] text-[color:var(--cream)]"
                    : "border-black/15 text-black/60 hover:border-black/40"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <div className="flex gap-6 text-sm">
            <div>
              <span className="font-display text-2xl">{upcoming.length}</span>
              <span className="ml-2 text-black/50">próximas</span>
            </div>
            <div>
              <span className="font-display text-2xl">{missingData.length}</span>
              <span className="ml-2 text-black/50">a completar</span>
            </div>
          </div>
        </div>

        {/* Navegación de mes + leyenda */}
        <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setCursor(addMonths(cursor, -1))}
              aria-label="Mes anterior"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-black/15 text-xl text-black/60 transition hover:border-black/40"
            >
              ‹
            </button>
            <h2 className="min-w-[190px] text-center font-display text-2xl capitalize">
              {monthLabel(year, month)}
            </h2>
            <button
              type="button"
              onClick={() => setCursor(addMonths(cursor, 1))}
              aria-label="Mes siguiente"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-black/15 text-xl text-black/60 transition hover:border-black/40"
            >
              ›
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[13px] text-black/60">
            {(Object.keys(sourceMeta) as ReservationSource[]).map((s) => (
              <span key={s} className="inline-flex items-center gap-1.5">
                <span
                  className="h-3 w-3 rounded-sm"
                  style={{ backgroundColor: sourceMeta[s].color }}
                />
                {sourceMeta[s].label}
              </span>
            ))}
          </div>
        </div>

        {/* Calendario */}
        <ReservationCalendar
          year={year}
          month={month}
          reservations={filtered}
          showProperty={filter === "all"}
          onSelect={openEdit}
        />
        <p className="mt-2 text-[12px] text-black/45">
          Tocá una reserva en el calendario o en la tabla para completar o editar
          sus datos.
        </p>

        {/* Registro */}
        <section className="mt-10">
          <h2 className="mb-4 font-display text-2xl">Registro de reservas</h2>
          <div className="overflow-x-auto rounded-xl border border-black/10 bg-white">
            <table className="w-full min-w-[880px] text-left text-[15px]">
              <thead>
                <tr className="border-b border-black/10 text-[11px] uppercase tracking-[0.12em] text-black/45">
                  <th className="px-3 py-3 font-medium">Casa</th>
                  <th className="px-3 py-3 font-medium">Fuente</th>
                  <th className="px-3 py-3 font-medium">Entrada</th>
                  <th className="px-3 py-3 font-medium">Salida</th>
                  <th className="px-3 py-3 font-medium">Noches</th>
                  <th className="px-3 py-3 font-medium">Huésped</th>
                  <th className="px-3 py-3 font-medium">Teléfono</th>
                  <th className="px-3 py-3 font-medium">Monto</th>
                  <th className="px-3 py-3 font-medium">Notas</th>
                  <th className="px-3 py-3 font-medium">
                    <span className="sr-only">Acciones</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedRegistry.map((r) => (
                  <tr
                    key={r.id}
                    className="border-b border-black/[0.06] last:border-0 hover:bg-black/[0.02]"
                  >
                    <td className="whitespace-nowrap px-3 py-3 text-black/70">
                      {properties[r.propertySlug].shortName}
                    </td>
                    <td className="px-3 py-3">
                      <SourceBadge source={r.source} />
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {formatDateShort(r.checkIn)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {formatDateShort(r.checkOut)}
                    </td>
                    <td className="px-3 py-3 text-black/60">
                      {nightsBetween(r.checkIn, r.checkOut)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {r.guestName ?? (
                        <span className="text-[color:var(--gold)]">A completar</span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-black/60">
                      {r.guestPhone ?? "—"}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-black/60">
                      {formatMoney(r.amount, r.currency)}
                    </td>
                    <td className="max-w-[220px] px-3 py-3 text-black/55">
                      {r.notes ?? ""}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => openEdit(r)}
                        className="rounded-md border border-black/15 px-3 py-1.5 text-[13px] text-black/70 transition hover:border-black/40 hover:bg-black/[0.03]"
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                ))}
                {sortedRegistry.length === 0 && (
                  <tr>
                    <td
                      colSpan={10}
                      className="px-3 py-10 text-center text-black/45"
                    >
                      No hay reservas todavía. Usá “Nueva reserva” para agregar una.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {editing && (
        <ReservationForm
          draft={editing.draft}
          isNew={editing.isNew}
          onSave={handleSave}
          onDelete={handleDelete}
          onClose={() => setEditing(null)}
        />
      )}
    </main>
  );
}
