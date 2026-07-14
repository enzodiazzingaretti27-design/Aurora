/** Construye un link de WhatsApp (wa.me) con un mensaje pre-cargado.
 *  El número debe ser solo dígitos con código de país (ej. "5492610000000"). */
export function buildWhatsAppUrl(number: string, message: string): string {
  const digits = number.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
