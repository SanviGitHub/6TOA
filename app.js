// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBd5zxPOqP5AsqNwvCcf7ObVGqtjwBn2UA",
  authDomain: "loginregister-e02b9.firebaseapp.com",
  projectId: "loginregister-e02b9",
  storageBucket: "loginregister-e02b9.appspot.com",
  messagingSenderId: "63577091340",
  appId: "1:63577091340:web:4aa54982cc3dad7050ad29"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

// Verificar estado de autenticación en cada página
firebase.auth().onAuthStateChanged((user) => {
  const currentPage = window.location.pathname;
  if (user) {
    // Usuario está autenticado
    if (currentPage.includes('login.html') || currentPage.includes('register.html')) {
      window.location.href = 'index.html';
    }
  } else {
    // Usuario no está autenticado
    if (!currentPage.includes('login.html') && !currentPage.includes('register.html')) {
      window.location.href = 'login.html';
    }
  }
});

// Función para manejar el registro
const registerForm = document.getElementById("register-form");
if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;
    const confirmPassword = document.getElementById("reg-confirm-password").value;

    // Verifica si las contraseñas coinciden
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    // Registra al usuario
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        alert("¡Registrado exitosamente!");
        window.location.href = 'index.html';
      })
      .catch((error) => {
        alert("Error al registrarse: " + error.message);
      });
  });
}

// Función para manejar el login
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Inicia sesión
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        alert("¡Login exitoso!");
        window.location.href = 'index.html';
      })
      .catch((error) => {
        alert("Error al iniciar sesión: " + error.message);
      });
  });
}

// Función para cerrar sesión
function logout() {
  firebase.auth().signOut().then(() => {
    window.location.href = 'login.html';
  }).catch((error) => {
    console.error('Error al cerrar sesión:', error);
  });
}