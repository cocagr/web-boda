import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")

serve(async (req) => {
  const payload = await req.json()
  const { record } = payload // 'record' trae los datos del formulario

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "boda@tudominio.com",
      to: "tu-correo@outlook.com",
      subject: `Nueva confirmación: ${record.nombre}`,
      html: `
        <h1>Nuevo invitado: ${record.nombre}</h1>
        <p><strong>Asistencia:</strong> ${record.asistencia}</p>
        <p><strong>Menú:</strong> ${record.menu_principal}</p>
        <p><strong>Acompañante:</strong> ${record.tiene_acompanante ? record.nombre_acompanante : 'No'}</p>
        <p><strong>Alojamiento:</strong> ${record.alojamiento}</p>
      `
    }),
  })

  return new Response(JSON.stringify({ success: true }), { headers: { "Content-Type": "application/json" } })
})