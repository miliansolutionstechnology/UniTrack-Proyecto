import fetch from 'node-fetch';

// Vercel Serverless Function (TypeScript / Node)
// POST body: { to: string, name?: string }

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { to, name } = req.body;
  if (!to) return res.status(400).json({ error: 'Missing `to` address' });

  const API_KEY = process.env.RESEND_API_KEY;
  if (!API_KEY) return res.status(500).json({ error: 'Missing RESEND_API_KEY' });

  try {
    const html = `
      <div style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; background:#0f172a; color:#e2e8f0; padding:24px; border-radius:8px;">
        <h2 style="color:#ef4444;">Bienvenido a Unitrack Pro</h2>
        <p>Hola ${name || ''},</p>
        <p>Gracias por registrarte. Tu cuenta ha sido creada exitosamente.</p>
        <p>Accede al portal estudiantil para iniciar tu proceso académico.</p>
      </div>
    `;

    const body = {
      to,
      from: 'no-reply@unitrackpro.com',
      subject: 'Bienvenido a Unitrack Pro',
      html
    };

    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const json = await r.json();
    if (!r.ok) throw new Error(JSON.stringify(json));

    return res.status(200).json({ ok: true, result: json });
  } catch (err: any) {
    console.error('send-email error', err);
    return res.status(500).json({ error: err?.message || String(err) });
  }
}
