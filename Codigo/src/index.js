// Función para mostrar mensajes en el DOM
function mostrarMensaje(mensaje, tipo, elemento) {
    let mensajeElemento = document.createElement("p");
    mensajeElemento.textContent = mensaje;
    mensajeElemento.className = tipo === "error" ? "mensaje-error" : "mensaje-exito";
    
    let contenedor = document.querySelector(elemento);
    contenedor.appendChild(mensajeElemento);
    
    setTimeout(() => {
        mensajeElemento.remove();
    }, 3000);
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
            .catch(error => console.error("Error cargando usuarios:", error));
    }
    return usuarios || [];
}

let usuarios = cargarUsuarios();

// Función para guardar en localStorage
function guardarUsuarios() {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

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
    mostrarMensaje("Usuario registrado exitosamente", "exito", "#registroForm");
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
        mostrarMensaje("Cita programada exitosamente", "exito", "#citaForm");
    } else {
        mostrarMensaje("Usuario no encontrado", "error", "#citaForm");
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
        mostrarMensaje("Cita cancelada exitosamente", "exito", "#listaCitas");
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
    
    mostrarMensaje("Formulario enviado exitosamente", "exito", ".contact-form");
    document.querySelector(".contact-form").reset();
});

