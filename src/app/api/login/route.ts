import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import {
  SESSION_COOKIE,
  SESSION_TTL,
  createSessionToken,
} from "@/lib/auth";

/** Comparación en tiempo constante, robusta ante longitudes distintas. */
function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  if (ab.length !== bb.length) {
    // Comparar contra sí mismo para no filtrar la longitud por timing.
    timingSafeEqual(ab, ab);
    return false;
  }
  return timingSafeEqual(ab, bb);
}

export async function POST(request: Request) {
  const expectedUser = process.env.ADMIN_USER || "cecilia";
  const expectedPassword = process.env.ADMIN_PASSWORD || "";
  const secret = process.env.AUTH_SECRET || "";

  if (!expectedPassword || !secret) {
    return NextResponse.json(
      { error: "El acceso no está configurado en el servidor." },
      { status: 500 }
    );
  }

  let user = "";
  let password = "";
  try {
    const body = await request.json();
    user = typeof body.user === "string" ? body.user : "";
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const okUser = safeEqual(user, expectedUser);
  const okPassword = safeEqual(password, expectedPassword);
  if (!okUser || !okPassword) {
    return NextResponse.json(
      { error: "Usuario o contraseña incorrectos." },
      { status: 401 }
    );
  }

  const token = await createSessionToken(expectedUser, secret);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL,
  });
  return response;
}
