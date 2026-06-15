import fetch from 'node-fetch';

// Vercel function to register student server-side: inserts into Supabase (service role) and sends welcome email via Resend.
// POST body: { profile: { nombres, apellidos, correo, telefono, facultad, carrera, sede, jornada } }

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { profile, password } = req.body || {};
  if (!profile || !profile.correo) return res.status(400).json({ error: 'Missing profile or correo' });

  const SUPABASE_URL = process.env['SUPABASE_URL'];
  const SERVICE_KEY = process.env['SUPABASE_SERVICE_ROLE_KEY'];
  const RESEND_KEY = process.env['RESEND_API_KEY'];
  if (!SUPABASE_URL || !SERVICE_KEY) return res.status(500).json({ error: 'Supabase not configured' });

  try {
    // 1) Create auth user via Supabase Admin API if password provided
    let createdUser: any = null;
    if (password) {
      const createUserRes = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${SERVICE_KEY}`,
          apikey: SERVICE_KEY
        },
        body: JSON.stringify({
          email: profile.correo,
          password,
          user_metadata: { nombres: profile.nombres, apellidos: profile.apellidos },
          email_confirm: true
        })
      });

      const createJson = await createUserRes.json();
      if (!createUserRes.ok) {
        console.error('create user failed', createJson);
        throw createJson;
      }
      createdUser = createJson;
    }

    // 2) Insert profile into 'estudiantes' table
    const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/estudiantes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${SERVICE_KEY}`,
        apikey: SERVICE_KEY,
        Prefer: 'return=representation'
      },
      body: JSON.stringify([profile])
    });

    const insertJson = await insertRes.json();
    if (!insertRes.ok) throw insertJson;

    // 3) send welcome email via Resend if key present
    if (RESEND_KEY) {
      const html = `
        <div style="font-family: system-ui; background:#0f172a; color:#e2e8f0; padding:24px; border-radius:8px;">
          <h2 style="color:#ef4444;">Bienvenido a Unitrack Pro</h2>
          <p>Hola ${profile.nombres || ''},</p>
          <p>Gracias por registrarte. Tu cuenta ha sido creada exitosamente.</p>
        </div>
      `;

      try {
        const emailRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${RESEND_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            to: profile.correo,
            from: 'no-reply@unitrackpro.com',
            subject: 'Bienvenido a Unitrack Pro',
            html
          })
        });

        if (!emailRes.ok) {
          const err = await emailRes.text();
          console.warn('Resend failed:', err);
        }
      } catch (e) {
        console.warn('Resend error', e);
      }
    }

    // 4) If ANON key present, request a session token for the new user (password grant)
    let session: any = null;
    const ANON_KEY = process.env['SUPABASE_ANON_KEY'];
    if (ANON_KEY && password) {
      try {
        const params = new URLSearchParams();
        params.append('email', profile.correo);
        params.append('password', password);
        params.append('grant_type', 'password');

        const tokenRes = await fetch(`${SUPABASE_URL}/auth/v1/token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            apikey: ANON_KEY,
            Authorization: `Bearer ${ANON_KEY}`
          },
          body: params.toString()
        });

        const tokenJson = await tokenRes.json();
        if (tokenRes.ok) session = tokenJson;
        else console.warn('token request failed', tokenJson);
      } catch (e) {
        console.warn('token request error', e);
      }
    }

    return res.status(200).json({ ok: true, user: createdUser, inserted: insertJson, session });
  } catch (err) {
    console.error('register-student error', err);
    return res.status(500).json({ error: err });
  }
}
