// Obtener datos desde localStorage o inicializar
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

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
    alert("Usuario registrado exitosamente");
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
    } else {
        alert("Usuario no encontrado");
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
    }
}
