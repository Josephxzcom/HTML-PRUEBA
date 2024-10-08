// Función para validar el inicio de sesión
const validateLogin = (event) => {
    event.preventDefault(); // Evita el envío del formulario

    // Obtener los valores de los campos de entrada
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    // Mapeo de nombres de usuario a contraseñas, nombres completos y roles
    const users = {
        '62219561': { password: '123456789', fullName: 'Erlinda Pérez P.', role: 'user' },
        '62299877': { password: '7114', fullName: 'Elmer Cubas P.', role: 'admin' },
        '87654321': { password: '456', fullName: 'Johnny Lluen', role: 'user' }
    };

    // Verificar si el usuario existe y la contraseña es correcta
    if (users[username]?.password === password) {
        // Guardar información del usuario en localStorage
        localStorage.setItem('username', username);
        localStorage.setItem('fullName', users[username].fullName);
        localStorage.setItem('role', users[username].role);

        // Manejo de "Recordarme"
        if (document.getElementById('rememberMe').checked) {
            localStorage.setItem('password', password);
        } else {
            localStorage.removeItem('password');
        }

        // Redirige a la intranet
        window.location.href = 'intranet.html';
    } else {
        // Mostrar mensaje de error
        alert('Usuario o contraseña incorrectos. Inténtalo de nuevo.');
    }
};

// Al cargar la página, verifica si hay credenciales guardadas
window.onload = () => {
    const savedUsername = localStorage.getItem('username');
    const savedPassword = localStorage.getItem('password'); // Opcional

    if (savedUsername) {
        document.getElementById('username').value = savedUsername;
    }
    if (savedPassword) {
        document.getElementById('password').value = savedPassword;
        document.getElementById('rememberMe').checked = true; // Opcional: marcar "Recordarme"
    }
};
