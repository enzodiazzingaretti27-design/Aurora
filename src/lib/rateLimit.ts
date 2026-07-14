/** Rate limiter simple en memoria por clave (ej. IP). Suficiente para frenar
 *  fuerza bruta en un panel de un solo usuario. Nota: al ser en memoria, el
 *  conteo es por instancia del servidor; para algo distribuido haría falta un
 *  store compartido (Redis/Upstash). */

interface Attempt {
  count: number;
  resetAt: number;
}

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutos

const attempts = new Map<string, Attempt>();

export function checkRateLimit(key: string): {
  allowed: boolean;
  retryAfterSeconds?: number;
} {
  const now = Date.now();
  const record = attempts.get(key);
  if (!record || record.resetAt <= now) return { allowed: true };
  if (record.count >= MAX_ATTEMPTS) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((record.resetAt - now) / 1000),
    };
  }
  return { allowed: true };
}

export function registerFailedAttempt(key: string): void {
  const now = Date.now();
  const record = attempts.get(key);
  if (!record || record.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return;
  }
  record.count += 1;
}

export function clearAttempts(key: string): void {
  attempts.delete(key);
}
