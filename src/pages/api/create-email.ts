import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    // 1️⃣ Leer los datos del formulario
    const formData = await request.formData();
    const name = formData.get('name')?.toString() || '';
    const email = formData.get('email')?.toString() || '';
    const phone = formData.get('phone')?.toString() || '';
    const date = formData.get('date')?.toString() || '';
    const comentario = formData.get('comentario')?.toString() || '';

    // 2️⃣ Validar datos básicos (opcional)
    if (!name || !email || !phone || !date || !comentario) {
      return new Response(
        JSON.stringify({ message: 'Todos los campos son obligatorios.' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // 3️⃣ Procesar datos (aquí puedes guardar en DB, enviar email, etc.)
    const formattedMessage = `
      ✅ Nuevo formulario recibido:
      - Nombre: ${name}
      - Email: ${email}
      - Teléfono: ${phone}
      - Fecha de reserva: ${date}
      - Comentario: ${comentario}
    `;

    console.log(formattedMessage);

    // Aquí podrías usar nodemailer, Mailgun, etc.

    // 4️⃣ Responder al cliente (navegador)
    return new Response(
      JSON.stringify({
        success: true,
        message: '¡Formulario recibido correctamente!',
        data: { name, email, phone, date, comentario },
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error procesando formulario:', error);

    return new Response(
      JSON.stringify({
        success: false,
        message: 'Ocurrió un error procesando el formulario.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
