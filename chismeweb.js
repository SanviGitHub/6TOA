document.addEventListener('DOMContentLoaded', function() {
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    const timestamp = localStorage.getItem('timestamp');
    const tiempoActual = new Date().getTime();
    const tiempoExpiracion = 60 * 1000; // 1 minuto en milisegundos

    if (usuarioLogueado !== 'true' || tiempoActual - parseInt(timestamp) > tiempoExpiracion) {
        // Si no hay sesión iniciada o la sesión ha expirado, redirigir a chisme.html
        window.location.href = 'chisme.html';
    }
});
