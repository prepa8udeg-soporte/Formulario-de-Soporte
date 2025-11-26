// **IMPORTANTE:** Reemplaza ESTA URL con la URL de tu Despliegue de Apps Script.
const GAS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzac6bFQ6NJEBqP1nNe5MFHfI-WD2ConXbcSVS1bnE8nJdbJJa3nzD4CRqSXNW7YjE3/exec";

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
        body: data, 
        mode: 'no-cors'
    })
    .then(response => {
        // Lógica de éxito: Añadir clase de éxito
        submitButton.textContent = 'Reporte Enviado ✅';
        
        // **MODIFICACIÓN AQUÍ**
        responseMessage.className = 'success-message'; // Establece la clase de éxito
        
        responseMessage.textContent = '¡Reporte enviado con éxito! Se ha registrado en la hoja de cálculo.';
        
        // Resetear el formulario después de un éxito simulado
        form.reset();
    })
    .catch(error => {
        // Lógica de error: Añadir clase de error
        console.error('Error de red:', error);
        submitButton.textContent = 'Error al Enviar ❌';
        
        // **MODIFICACIÓN AQUÍ**
        responseMessage.className = 'error-message'; // Establece la clase de error
        
        responseMessage.textContent = 'Ocurrió un error al intentar enviar el reporte. Revisa la consola o tu URL.';
    })
    .finally(() => {
        // Volver a habilitar el botón y resetear después de un breve tiempo
        setTimeout(() => {
            submitButton.disabled = false;
            submitButton.textContent = 'Enviar Reporte';
        }, 3000);
    });
});
