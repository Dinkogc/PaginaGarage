window.addEventListener('DOMContentLoaded', () => {
    const fechaInput = document.getElementById('fecha');
    if (fechaInput) {
        fechaInput.valueAsDate = new Date();
    }

    mostrarSeccion("inicio");

    document.querySelectorAll("nav a").forEach(enlace => {
        enlace.addEventListener("click", (e) => {
            e.preventDefault();

            
            document.querySelectorAll("nav a").forEach(e => e.classList.remove("activo"));

            enlace.classList.add("activo");

            const id = enlace.getAttribute("href").substring(1);
            mostrarSeccion(id);
        });
    });
});
function soloLetras(texto){
    return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(texto);
}
function correoValido(email) {
    const regex = /^[\w.-]+@[\w.-]+\.[a-z]{2,6}$/i;
    return regex.test(email);
}

document.getElementById('form-inscripcion').addEventListener('submit', function (e){
    e.preventDefault();

    const nombre=document.getElementById('nombre').value.trim();
    const email=document.getElementById('email').value.trim();
    const marca=document.getElementById('marca').value;
    const anio=document.getElementById('anio').value;
    const fecha=document.getElementById('fecha').value;
    const comentarios=document.getElementById('comentarios').value.trim();
    
    const categoriasSeleccionadas=[];
    document.querySelectorAll('input[name="categoria"]:checked').forEach((checkbox)=>{
        categoriasSeleccionadas.push(checkbox.value);
    });
    if(!nombre || !email || !anio || categoriasSeleccionadas.length ===0){
        alert("Por favor, completa todos los campos obligatorios.");
        return;
    }
    if (!soloLetras(nombre)){
        alert("El nombre solo puede contener letras y espacios.");
        return;
    }
    if(!correoValido(email)){
        alert("Por favor ingresa un correo con un dominio válido (como .cl, .com, .org, etc.)");
        return;
    }
    const inscripcion={
        piloto: nombre,
        email: email,
        marca: marca,
        anio: anio,
        fecha: fecha,
        categorias: categoriasSeleccionadas,
        comentarios: comentarios
    };

    let inscripciones=JSON.parse(localStorage.getItem("inscripciones")) || [];
    inscripciones.push(inscripcion);
    localStorage.setItem("inscripciones", JSON.stringify(inscripciones));

    document.getElementById('mensajeExito').style.display='block';
    this.reset();
    document.getElementById('fecha').valueAsDate=new Date();
});

document.getElementById('form-contacto').addEventListener('submit', function(e){
    e.preventDefault();

    const nombreContacto=document.getElementById('nombre-contacto').value.trim();
    const emailContacto=document.getElementById('email-contacto').value.trim();
    const mensaje=document.getElementById('mensaje-contacto').value.trim();

    if (!nombreContacto || !emailContacto || !mensaje){
        alert('Por favor, completa todos los campos.');
        return;
    }
    if(!soloLetras(nombreContacto)){
        alert("El nombre solo puede contener letras y espacios.");
        return;
    }
    if(!correoValido(emailContacto)){
        alert("Por favor ingresa un correo con un dominio válido (como .cl, .com, .org, etc.)");
        return;
    }
    document.getElementById('mensajeExitoContacto').style.display='block';
    this.reset();
    setTimeout(()=>{
        document.getElementById('mensajeExitoContacto').style.display='none';
    }, 3000);
    
});

function mostrarSeccion(id){
    document.querySelectorAll("main section").forEach(seccion=>{
        seccion.classList.remove("activa");
    });
    const seccionActiva=document.getElementById(id);
    if (seccionActiva){
        seccionActiva.classList.add("activa");
    }
}



document.getElementById('modoOscuroToggle').addEventListener('click',()=>{
    document.body.classList.toggle('modo-oscuro');
});
const botonModoOscuro=document.getElementById('modoOscuroToggle');
if(localStorage.getItem('modoOscuro')==='true'){
    document.body.classList.add('modo-oscuro');
}

botonModoOscuro.addEventListener('click',()=>{
    document.body.classList.toggle('modo-oscuro');
    const activado=document.body.classList.contains('modo-oscuro');
    localStorage.setItem('modoOscuro',activado);
});

const actualizarIconoModo = () => {
    botonModoOscuro.textContent = document.body.classList.contains('modo-oscuro') ? '🌞' : '🌙';
};

actualizarIconoModo();

botonModoOscuro.addEventListener('click', () => {
    document.body.classList.toggle('modo-oscuro');
    const activado = document.body.classList.contains('modo-oscuro');
    localStorage.setItem('modoOscuro', activado);
    actualizarIconoModo();
});



