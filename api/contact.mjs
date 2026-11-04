/**
 * Vercel Function: receives the contact form and emails it through Resend.
 *
 * Plain ESM (.mjs) on purpose: the project's tsconfig is set for bundlers
 * (module: esnext) and package.json has no "type": "module", which made the
 * TypeScript version fail to load on Vercel (FUNCTION_INVOCATION_FAILED).
 *
 * Environment variables (Vercel → Project → Settings → Environment Variables):
 *   RESEND_API_KEY  secret key from resend.com (never commit it)
 *   CONTACT_TO      address that receives the messages (bethocubans1990@gmail.com)
 *   CONTACT_FROM    optional; defaults to Resend's shared sender, which can only
 *                   deliver to the email the Resend account was created with
 */

const MAX = { name: 100, email: 200, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });

const clean = (value, max) =>
  typeof value === 'string' ? value.replace(/\r/g, '').trim().slice(0, max) : '';

export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return json({ ok: false, error: 'invalid_json' }, 400);
  }

  // Honeypot: real visitors never fill this hidden field, bots usually do.
  if (typeof data.website === 'string' && data.website.trim() !== '') {
    return json({ ok: true });
  }

  const name = clean(data.name, MAX.name);
  const email = clean(data.email, MAX.email);
  const message = clean(data.message, MAX.message);

  if (!name || !message || !EMAIL_RE.test(email)) {
    return json({ ok: false, error: 'invalid_fields' }, 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  if (!apiKey || !to) {
    return json({ ok: false, error: 'not_configured' }, 500);
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? 'Portfolio <onboarding@resend.dev>',
      to: [to],
      reply_to: email,
      // Header values must be single-line
      subject: `Portfolio: mensaje de ${name.replace(/[\r\n]+/g, ' ')}`,
      text: `Nombre: ${name}\nEmail: ${email}\n\n${message}`,
    }),
  });

  if (!res.ok) {
    return json({ ok: false, error: 'send_failed' }, 502);
  }
  return json({ ok: true });
}

export function GET() {
  return json({ ok: false, error: 'method_not_allowed' }, 405);
}
