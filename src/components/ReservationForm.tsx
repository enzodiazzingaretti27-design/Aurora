"use client";

import { useEffect, useId, useRef, useState } from "react";
import { properties, propertySlugs, type PropertySlug } from "@/data/properties";
import { reservationSources } from "@/types/reservation";
import type { Reservation, ReservationSource } from "@/types/reservation";
import { sourceMeta } from "@/types/reservation";
import { nightsBetween, parseDate } from "@/lib/dates";

export interface ReservationDraft {
  id: string;
  propertySlug: PropertySlug;
  source: ReservationSource;
  checkIn: string;
  checkOut: string;
  guestName: string;
  guestPhone: string;
  amount: string;
  currency: string;
  notes: string;
}

/** Estilos compartidos de campos (grandes y legibles para facilitar la carga). */
const fieldClass =
  "w-full rounded-lg border border-black/20 bg-white px-3 py-2.5 text-[15px] text-[color:var(--brown)] outline-none focus:border-[color:var(--brown)] focus:ring-2 focus:ring-[color:var(--brown)]/20";
const labelClass = "mb-1.5 block text-[13px] font-medium text-black/70";

export default function ReservationForm({
  draft,
  isNew,
  onSave,
  onDelete,
  onClose,
}: {
  draft: ReservationDraft;
  isNew: boolean;
  onSave: (reservation: Reservation) => void;
  onDelete?: (id: string) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<ReservationDraft>(draft);
  const [error, setError] = useState<string | null>(null);
  const firstFieldRef = useRef<HTMLSelectElement>(null);
  const titleId = useId();

  useEffect(() => {
    firstFieldRef.current?.focus();
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  function set<K extends keyof ReservationDraft>(key: K, value: ReservationDraft[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.checkIn || !form.checkOut) {
      setError("Completá las fechas de entrada y salida.");
      return;
    }
    if (parseDate(form.checkOut).getTime() <= parseDate(form.checkIn).getTime()) {
      setError("La fecha de salida tiene que ser posterior a la de entrada.");
      return;
    }
    const amountNum = form.amount.trim() === "" ? undefined : Number(form.amount);
    if (amountNum != null && Number.isNaN(amountNum)) {
      setError("El monto tiene que ser un número.");
      return;
    }
    onSave({
      id: form.id,
      propertySlug: form.propertySlug,
      source: form.source,
      checkIn: form.checkIn,
      checkOut: form.checkOut,
      guestName: form.guestName.trim() || undefined,
      guestPhone: form.guestPhone.trim() || undefined,
      amount: amountNum,
      currency: amountNum != null ? form.currency.trim() || "ARS" : undefined,
      notes: form.notes.trim() || undefined,
    });
  }

  const nights =
    form.checkIn && form.checkOut && parseDate(form.checkOut) > parseDate(form.checkIn)
      ? nightsBetween(form.checkIn, form.checkOut)
      : null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-[color:var(--cream)] p-6 shadow-2xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between">
          <h2 id={titleId} className="font-display text-3xl text-[color:var(--brown)]">
            {isNew ? "Nueva reserva" : "Editar reserva"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="flex h-9 w-9 items-center justify-center rounded-full text-2xl leading-none text-black/50 transition hover:bg-black/10 hover:text-black"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="f-casa" className={labelClass}>
                Casa
              </label>
              <select
                id="f-casa"
                ref={firstFieldRef}
                value={form.propertySlug}
                onChange={(e) => set("propertySlug", e.target.value as PropertySlug)}
                className={fieldClass}
              >
                {propertySlugs.map((slug) => (
                  <option key={slug} value={slug}>
                    {properties[slug].brandName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="f-fuente" className={labelClass}>
                Fuente
              </label>
              <select
                id="f-fuente"
                value={form.source}
                onChange={(e) => set("source", e.target.value as ReservationSource)}
                className={fieldClass}
              >
                {reservationSources.map((s) => (
                  <option key={s} value={s}>
                    {sourceMeta[s].label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="f-entrada" className={labelClass}>
                Entrada <span className="text-[color:var(--gold)]">*</span>
              </label>
              <input
                id="f-entrada"
                type="date"
                required
                value={form.checkIn}
                onChange={(e) => set("checkIn", e.target.value)}
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="f-salida" className={labelClass}>
                Salida <span className="text-[color:var(--gold)]">*</span>
              </label>
              <input
                id="f-salida"
                type="date"
                required
                value={form.checkOut}
                onChange={(e) => set("checkOut", e.target.value)}
                className={fieldClass}
              />
            </div>
          </div>

          {nights != null && (
            <p className="text-[13px] text-black/55">
              {nights} {nights === 1 ? "noche" : "noches"}
            </p>
          )}

          <div>
            <label htmlFor="f-huesped" className={labelClass}>
              Huésped
            </label>
            <input
              id="f-huesped"
              type="text"
              value={form.guestName}
              onChange={(e) => set("guestName", e.target.value)}
              placeholder="Nombre y apellido"
              className={fieldClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="f-tel" className={labelClass}>
                Teléfono
              </label>
              <input
                id="f-tel"
                type="tel"
                value={form.guestPhone}
                onChange={(e) => set("guestPhone", e.target.value)}
                placeholder="+54 9 …"
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="f-monto" className={labelClass}>
                Monto (ARS)
              </label>
              <input
                id="f-monto"
                type="number"
                inputMode="numeric"
                min="0"
                value={form.amount}
                onChange={(e) => set("amount", e.target.value)}
                placeholder="0"
                className={fieldClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="f-notas" className={labelClass}>
              Notas
            </label>
            <textarea
              id="f-notas"
              rows={2}
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              placeholder="Horario de llegada, pedidos especiales…"
              className={`${fieldClass} resize-none`}
            />
          </div>

          {error && (
            <p role="alert" className="text-[14px] text-[#c0392b]">
              {error}
            </p>
          )}

          <div className="flex items-center justify-between gap-3 pt-2">
            {!isNew && onDelete ? (
              <button
                type="button"
                onClick={() => onDelete(form.id)}
                className="rounded-lg px-3 py-2.5 text-[14px] font-medium text-[#c0392b] transition hover:bg-[#c0392b]/10"
              >
                Eliminar
              </button>
            ) : (
              <span />
            )}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-black/20 px-4 py-2.5 text-[14px] font-medium text-black/70 transition hover:border-black/40"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="rounded-lg bg-[color:var(--brown)] px-5 py-2.5 text-[14px] font-medium text-[color:var(--cream)] transition hover:opacity-90"
              >
                Guardar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
