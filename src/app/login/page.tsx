"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

function safeInternalPath(value: string | null): string {
  // Evita open redirects: solo rutas internas que empiezan con "/" (no "//").
  if (value && value.startsWith("/") && !value.startsWith("//")) return value;
  return "/panel";
}

function LoginForm() {
  const searchParams = useSearchParams();
  const target = safeInternalPath(searchParams.get("from"));

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, password }),
      });
      if (res.ok) {
        window.location.href = target;
        return;
      }
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "No se pudo iniciar sesión.");
    } catch {
      setError("No se pudo conectar. Probá de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  const fieldClass =
    "w-full rounded-lg border border-black/20 bg-white px-3.5 py-3 text-[16px] text-[color:var(--brown)] outline-none focus:border-[color:var(--brown)] focus:ring-2 focus:ring-[color:var(--brown)]/20";
  const labelClass = "mb-1.5 block text-[14px] font-medium text-black/70";

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm rounded-2xl border border-black/10 bg-[color:var(--cream)] p-7 shadow-xl"
    >
      <p className="mb-2 text-[11px] uppercase tracking-[0.3em] text-[color:var(--gold)]">
        Panel de reservas
      </p>
      <h1 className="mb-6 font-display text-4xl text-[color:var(--brown)]">
        Iniciar sesión
      </h1>

      <div className="space-y-4">
        <div>
          <label htmlFor="user" className={labelClass}>
            Usuario
          </label>
          <input
            id="user"
            type="text"
            autoComplete="username"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className={fieldClass}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className={labelClass}>
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={fieldClass}
            required
          />
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-4 text-[14px] text-[#c0392b]">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full rounded-lg bg-[color:var(--brown)] px-5 py-3 text-[15px] font-medium text-[color:var(--cream)] transition hover:opacity-90 disabled:opacity-60"
      >
        {loading ? "Ingresando…" : "Entrar"}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <main className="grain flex min-h-screen items-center justify-center bg-[color:var(--sand)] px-5 py-10">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
