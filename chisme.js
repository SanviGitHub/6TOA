document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const usuarioValido = 'chisme@chismeprivvvvvv.gov.ar';
        const contraseñaValida = 'invaluadite494583';

        if (email === usuarioValido && password === contraseñaValida) {
            // Almacenar en LocalStorage que el usuario ha iniciado sesión y el timestamp actual.
            localStorage.setItem('usuarioLogueado', 'true');
            localStorage.setItem('timestamp', new Date().getTime().toString());
            window.location.href = 'chismeweb.html';
        } else {
            alert('El correo electrónico o la contraseña son incorrectos.');
        }
    });
});
