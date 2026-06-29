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
  from: "confirmaciones@bodalaurayleandro.com",
  to: "tu-correo@outlook.com",
  subject: `Nueva confirmación: ${record.nombre}`,
  html: `
    <h1>Detalles de la confirmación</h1>
    <h2>Principal</h2>
    <p><strong>Invitado:</strong> ${record.nombre}</p>
    <p><strong>Asistencia:</strong> ${record.asistencia}</p>
    <p><strong>Menú:</strong> ${record.menu_principal || 'No seleccionado'}</p>
    <p><strong>Alergias:</strong> ${record.alergias_principal || 'Ninguna'}</p>
    
    <h2>Acompañante</h2>
    <p><strong>¿Trae acompañante?:</strong> ${record.tiene_acompanante ? 'Sí' : 'No'}</p>
    ${record.tiene_acompanante ? `
      <p><strong>Nombre acompañante:</strong> ${record.nombre_acompanante || 'No indicado'}</p>
      <p><strong>Menú acompañante:</strong> ${record.menu_acompanante || 'No seleccionado'}</p>
      <p><strong>Alergias acompañante:</strong> ${record.alergias_acompanante || 'Ninguna'}</p>
    ` : ''}

    <h2>Logística</h2>
    <p><strong>Alojamiento:</strong> ${record.alojamiento || 'No indicado'}</p>
    <p><strong>¿Usa autobús?:</strong> ${record.usa_autobus ? 'Sí' : 'No'}</p>
  `
}),
  })

  return new Response(JSON.stringify({ success: true }), { headers: { "Content-Type": "application/json" } })
})