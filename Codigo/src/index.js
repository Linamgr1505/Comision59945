// Variables, constantes y arrays
const usuarios = [
    { id: 1, nombre: "Juan Perez", citas: ["2024-12-20 10:00", "2024-12-25 14:00"] },
    { id: 2, nombre: "Maria Lopez", citas: ["2024-12-22 09:00"] }
];

// Función para mostrar el menú principal
function mostrarMenu() {
    let opcion;
    do {
        opcion = prompt(`Bienvenido al sistema dental\nSeleccione una opción:\n1. Ver citas\n2. Programar cita\n3. Cancelar cita\n4. Salir`);
        switch (opcion) {
            case "1":
                verCitas();
                break;
            case "2":
                programarCita();
                break;
            case "3":
                cancelarCita();
                break;
            case "4":
                alert("Gracias por usar el sistema. ¡Hasta luego!");
                break;
            default:
                alert("Por favor, seleccione una opción válida.");
        }
    } while (opcion !== "4");
}

// Función para ver citas
function verCitas() {
    const nombreUsuario = prompt("Ingrese su nombre:");
    const usuario = usuarios.find(u => u.nombre.toLowerCase() === nombreUsuario.toLowerCase());

    if (usuario) {
        if (usuario.citas.length > 0) {
            alert(`Citas programadas:\n${usuario.citas.join("\n")}`);
        } else {
            alert("No tiene citas programadas.");
        }
    } else {
        alert("Usuario no encontrado.");
    }
}

// Función para programar una cita
function programarCita() {
    const nombreUsuario = prompt("Ingrese su nombre:");
    const usuario = usuarios.find(u => u.nombre.toLowerCase() === nombreUsuario.toLowerCase());

    if (usuario) {
        const nuevaCita = prompt("Ingrese la fecha y hora de la cita (YYYY-MM-DD HH:MM):");
        if (confirm(`¿Desea programar la cita para ${nuevaCita}?`)) {
            usuario.citas.push(nuevaCita);
            alert("Cita programada exitosamente.");
        }
    } else {
        alert("Usuario no encontrado.");
    }
}

// Función para cancelar una cita
function cancelarCita() {
    const nombreUsuario = prompt("Ingrese su nombre:");
    const usuario = usuarios.find(u => u.nombre.toLowerCase() === nombreUsuario.toLowerCase());

    if (usuario) {
        if (usuario.citas.length > 0) {
            const citasListado = usuario.citas.map((cita, index) => `${index + 1}. ${cita}`).join("\n");
            const indiceCita = parseInt(prompt(`Seleccione la cita a cancelar:\n${citasListado}`)) - 1;

            if (indiceCita >= 0 && indiceCita < usuario.citas.length) {
                if (confirm(`¿Está seguro de que desea cancelar la cita: ${usuario.citas[indiceCita]}?`)) {
                    usuario.citas.splice(indiceCita, 1);
                    alert("Cita cancelada exitosamente.");
                }
            } else {
                alert("Selección inválida.");
            }
        } else {
            alert("No tiene citas programadas para cancelar.");
        }
    } else {
        alert("Usuario no encontrado.");
    }
}

// Inicializar el sistema
mostrarMenu();
