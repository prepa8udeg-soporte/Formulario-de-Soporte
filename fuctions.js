// **IMPORTANTE:** Reemplaza ESTA URL con la URL de tu Despliegue de Apps Script.
const GAS_WEB_APP_URL = "vhttps://script.google.com/macros/s/AKfycbw4pRrH02GRZ98vBFUOQJUbo8w4ZqUa8Mx0o-3Nog7A1SM8Q0YBol4EfOhluHw3wcDb/exec";

const form = document.getElementById('technicalReportForm');
const submitButton = document.getElementById('submitButton');
const responseMessage = document.getElementById('responseMessage');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Detener el envío de formulario estándar

    // Deshabilitar botón y mostrar mensaje de carga
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';
    responseMessage.textContent = '';
    responseMessage.classList.add('hidden');

    // Convertir datos del formulario a un objeto URLSearchParams
    const formData = new FormData(form);
    const data = new URLSearchParams(formData);

    // Enviar los datos al Apps Script
    fetch(GAS_WEB_APP_URL, {
        method: 'POST',
        body: data, // El Apps Script espera los datos como 'application/x-www-form-urlencoded'
        mode: 'no-cors' // Necesario para evitar errores de CORS con Apps Script
    })
    .then(response => {
        // La respuesta de Apps Script suele ser opaca debido a 'no-cors',
        // pero la acción de guardado y correo ya debería haberse completado.

        submitButton.textContent = 'Reporte Enviado ✅';
        responseMessage.textContent = '¡Reporte enviado con éxito! Se ha registrado en la hoja de cálculo.';
        responseMessage.classList.remove('hidden');
        responseMessage.style.backgroundColor = '#d4edda'; // Estilo de éxito

        // Resetear el formulario después de un éxito simulado
        form.reset();
    })
    .catch(error => {
        // En caso de error de red
        console.error('Error de red:', error);
        submitButton.textContent = 'Error al Enviar ❌';
        responseMessage.textContent = 'Ocurrió un error al intentar enviar el reporte. Revisa la consola o tu URL.';
        responseMessage.classList.remove('hidden');
        responseMessage.style.backgroundColor = '#f8d7da'; // Estilo de error
    })
    .finally(() => {
        // Volver a habilitar el botón y resetear después de un breve tiempo
        setTimeout(() => {
            submitButton.disabled = false;
            submitButton.textContent = 'Enviar Reporte';
        }, 3000);
    });
});
