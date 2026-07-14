"use client";

import { useEffect, useState } from "react";
import type { Reservation } from "@/types/reservation";
import { reservations as seed } from "@/data/reservations";

const STORAGE_KEY = "cecilia:reservations:v1";

/** Estado de reservas persistido en el navegador (localStorage). Arranca con los
 *  datos de ejemplo y guarda cualquier cambio localmente. Cuando exista una base
 *  de datos real, se reemplaza esta capa sin tocar los componentes. */
export function useReservations() {
  const [items, setItems] = useState<Reservation[]>(seed);
  const [loaded, setLoaded] = useState(false);

  // Cargar desde localStorage después del primer render. El setState acá es
  // intencional: hidratamos con los datos del navegador recién en el cliente para
  // evitar un mismatch de hidratación (el server no tiene acceso a localStorage).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setItems(JSON.parse(raw) as Reservation[]);
    } catch {
      /* ignorar almacenamiento no disponible o corrupto */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignorar cuota / modo privado */
    }
  }, [items, loaded]);

  function upsert(reservation: Reservation) {
    setItems((prev) => {
      const index = prev.findIndex((r) => r.id === reservation.id);
      if (index === -1) return [...prev, reservation];
      const copy = [...prev];
      copy[index] = reservation;
      return copy;
    });
  }

  function remove(id: string) {
    setItems((prev) => prev.filter((r) => r.id !== id));
  }

  function resetToSeed() {
    setItems(seed);
  }

  return { items, loaded, upsert, remove, resetToSeed };
}
