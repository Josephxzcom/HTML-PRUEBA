// Variables para almacenar ingresos y egresos
let totalIngresos = 0;
let totalEgresos = 0;
let chart; // Referencia al gráfico
let egresos = []; // Array para almacenar los egresos

// Mostrar el nombre de usuario y verificar si es administrador
function displayWelcomeMessage() {
    const fullName = localStorage.getItem('fullName');
    const role = localStorage.getItem('role'); // Recuperamos el rol del usuario
    const welcomeMessage = document.getElementById('welcome-message');
    const adminSection = document.getElementById('admin-section');
    const inventorySection = document.getElementById('inventory-section');
    const generatePDFButton = document.getElementById('generatePDF');

    if (fullName) {
        welcomeMessage.innerText = fullName;

        // Si el rol es 'admin' o el usuario es 62299877, mostramos la sección de administrador
        if (role === 'admin' || localStorage.getItem('username') === '62299877') {
            adminSection.style.display = 'block'; // Muestra la sección de registrar pedido
        }

        // Si el usuario es 62219561, mostramos la sección de inventario
        if (localStorage.getItem('username') === '62219561') {
            inventorySection.style.display = 'block'; // Muestra la sección de inventario y ventas
            loadInventory(); // Cargar inventario al iniciar
            loadVentaForm(); // Cargar los productos en el formulario de venta
            generatePDFButton.style.display = 'block'; // Mostrar el botón de generar PDF
        } else {
            generatePDFButton.style.display = 'none'; // Ocultar el botón si no es el usuario permitido
        }
    } else {
        welcomeMessage.innerText = 'Invitado';
        generatePDFButton.style.display = 'none'; // Asegurarse de que el botón esté oculto si no hay usuario
    }
}

// Función para cerrar sesión
function logout() {
    localStorage.clear(); // Limpia todos los datos del almacenamiento local
    window.location.href = 'login.html'; // Redirige al inicio de sesión
}

// Ejecutar las funciones al cargar la página
window.onload = function() {
    displayWelcomeMessage(); // Muestra el mensaje de bienvenida
    loadPedidos(); // Carga los pedidos guardados al iniciar
    initializeChart(); // Inicializa el gráfico
};

// Asignar el evento de clic al botón de cerrar sesión
document.getElementById('logout').addEventListener('click', function(event) {
    event.preventDefault(); // Evita el comportamiento predeterminado del enlace
    logout(); // Llama a la función logout
});

// Inicializar el gráfico
function initializeChart() {
    const ctx = document.getElementById('myChart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'bar', // Tipo de gráfico
        data: {
            labels: ['Ingresos', 'Egresos'], // Etiquetas
            datasets: [{
                label: 'Total',
                data: [totalIngresos, totalEgresos], // Datos para el gráfico
                backgroundColor: ['#007bff', '#dc3545'], // Colores
                borderColor: ['#0056b3', '#c82333'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true // Comenzar en cero
                }
            }
        }
    });
}

// Función para manejar el registro de egresos
document.getElementById('egresoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const egreso = parseFloat(document.getElementById('egreso').value); // Convertir a número de punto flotante

    // Validar que el egreso no sea negativo
    if (isNaN(egreso) || egreso < 0) {
        alert('Por favor, ingresa un monto de egreso válido.'); // Mensaje de error
        return; // Salir de la función
    }

    totalEgresos += egreso; // Actualizar total de egresos
    egresos.push(egreso); // Almacenar el egreso en el array
    document.getElementById('egresoForm').reset(); // Limpiar el formulario de egreso
    updateChart(); // Actualizar gráfico
});

// Función para eliminar el último egreso
document.getElementById('deleteEgreso').addEventListener('click', function() {
    const username = localStorage.getItem('username');

    if (username !== '62219561') {
        alert('No tienes permiso para eliminar egresos.');
        return;
    }

    if (egresos.length === 0) {
        alert('No hay egresos para eliminar.');
        return;
    }

    const lastEgreso = egresos.pop(); // Elimina el último egreso del array
    totalEgresos -= lastEgreso; // Restar del total de egresos
    updateChart(); // Actualizar gráfico
    alert(`Se ha eliminado un egreso de ${lastEgreso}.`);
});

// Actualizar el gráfico
function updateChart() {
    if (chart) {
        chart.data.datasets[0].data = [totalIngresos, totalEgresos]; // Actualizar los datos del gráfico
        chart.update(); // Actualizar el gráfico
    }
}

// Otras funciones necesarias...
