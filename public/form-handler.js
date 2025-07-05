function waitForSwal(timeout = 5000) {
  return new Promise((resolve, reject) => {
    const interval = 50;
    let waited = 0;

    const check = () => {
      if (typeof Swal !== 'undefined') {
        resolve();
      } else if (waited >= timeout) {
        reject(new Error('Swal no se cargó a tiempo'));
      } else {
        waited += interval;
        setTimeout(check, interval);
      }
    };

    check();
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    await waitForSwal();

    const form = document.getElementById('demo-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      const recaptchaToken = grecaptcha.getResponse();

      if (!recaptchaToken) {
        Swal.fire({
          icon: 'warning',
          title: 'Verificación requerida',
          text: 'Por favor, completa el reCAPTCHA.',
        });
        return;
      }

      Swal.fire({
        title: 'Enviando...',
        text: 'Por favor espera un momento',
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      try {
        const response = await fetch('https://api.landingcrm.store/api/email/create-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-recaptcha-token': recaptchaToken
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
          Swal.fire({
            icon: 'success',
            title: '¡Formulario enviado!',
            text: 'Gracias por tu información. Te contactaremos pronto.',
          });
          form.reset();
          grecaptcha.reset();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error al enviar',
            text: result.message || 'Hubo un problema al procesar tu solicitud.',
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error de conexión',
          text: 'No se pudo conectar con el servidor. Intenta más tarde.',
        });
      }
    });
  } catch (error) {
    console.error(error);
  }
});
