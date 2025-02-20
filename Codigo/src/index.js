// Función para mostrar notificaciones con SweetAlert2
function mostrarMensaje(mensaje, tipo) {
    Swal.fire({
        text: mensaje,
        icon: tipo === "error" ? "error" : "success",
        confirmButtonText: "OK",
        timer: 3000,
        showConfirmButton: false
    });
}

// Obtener datos desde localStorage o JSON externo
function cargarUsuarios() {
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    if (!usuarios) {
        fetch('./data/usuarios.json')
            .then(response => response.json())
            .then(data => {
                localStorage.setItem("usuarios", JSON.stringify(data));
                usuarios = data;
            })
            .catch(() => mostrarMensaje("Error cargando usuarios", "error"));
    }
    return usuarios || [];
}

let usuarios = cargarUsuarios();

// Función para guardar en localStorage
function guardarUsuarios() {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

// Precargar datos en formularios
function precargarFormulario(idFormulario, campos) {
    let datosGuardados = JSON.parse(localStorage.getItem(idFormulario));
    if (datosGuardados) {
        campos.forEach(campo => {
            if (datosGuardados[campo]) {
                document.getElementById(campo).value = datosGuardados[campo];
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    precargarFormulario("registroForm", ["nombre", "apellido", "correo"]);
    precargarFormulario("contactForm", ["nombre", "telefono", "email"]);
});

// Función para registrar un usuario
function registrarUsuario(event) {
    event.preventDefault();
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let correo = document.getElementById("correo").value;
    let contraseña = document.getElementById("contraseña").value;
    
    let nuevoUsuario = { id: Date.now(), nombre, apellido, correo, contraseña, citas: [] };
    usuarios.push(nuevoUsuario);
    guardarUsuarios();
    localStorage.setItem("registroForm", JSON.stringify({ nombre, apellido, correo }));
    mostrarMensaje("Usuario registrado exitosamente", "success");
    document.getElementById("registroForm").reset();
}

document.getElementById("registroForm").addEventListener("submit", registrarUsuario);

// Función para programar una cita
function programarCita(event) {
    event.preventDefault();
    let correo = document.getElementById("correoCita").value;
    let fecha = document.getElementById("fechaCita").value;
    let usuario = usuarios.find(u => u.correo === correo);
    
    if (usuario) {
        usuario.citas.push(fecha);
        guardarUsuarios();
        mostrarCitas(correo);
        mostrarMensaje("Cita programada exitosamente", "success");
    } else {
        mostrarMensaje("Usuario no encontrado", "error");
    }
}

document.getElementById("citaForm").addEventListener("submit", programarCita);

// Función para mostrar citas de un usuario
function mostrarCitas(correo) {
    let usuario = usuarios.find(u => u.correo === correo);
    let citasContainer = document.getElementById("listaCitas");
    citasContainer.innerHTML = "";
    
    if (usuario && usuario.citas.length > 0) {
        usuario.citas.forEach((cita, index) => {
            let citaItem = document.createElement("li");
            citaItem.innerHTML = `${cita} <button onclick='cancelarCita("${correo}", ${index})'>Cancelar</button>`;
            citasContainer.appendChild(citaItem);
        });
    } else {
        citasContainer.innerHTML = "No tiene citas programadas.";
    }
}

// Función para cancelar una cita
function cancelarCita(correo, index) {
    let usuario = usuarios.find(u => u.correo === correo);
    if (usuario) {
        usuario.citas.splice(index, 1);
        guardarUsuarios();
        mostrarCitas(correo);
        mostrarMensaje("Cita cancelada exitosamente", "success");
    }
}

// Función para manejar el formulario de contacto
document.querySelector(".contact-form").addEventListener("submit", function(event) {
    event.preventDefault();
    let nombre = document.getElementById("nombre").value;
    let telefono = document.getElementById("telefono").value;
    let email = document.getElementById("email").value;
    
    let contactos = JSON.parse(localStorage.getItem("contactos")) || [];
    contactos.push({ nombre, telefono, email });
    localStorage.setItem("contactos", JSON.stringify(contactos));
    localStorage.setItem("contactForm", JSON.stringify({ nombre, telefono, email }));
    
    mostrarMensaje("Formulario enviado exitosamente", "success");
    document.querySelector(".contact-form").reset();
});

