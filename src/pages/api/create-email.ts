import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();

  const name = formData.get('name');
  const email = formData.get('email');
  const phone = formData.get('phone');
  const date = formData.get('date');
  const comentario = formData.get('comentario');

  // Aquí va tu lógica, por ejemplo:
  console.log('Datos recibidos:', { name, email, phone, date, comentario });

  // Ejemplo de respuesta:
  return new Response(
    JSON.stringify({ message: 'Formulario recibido y procesado correctamente' }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
};
