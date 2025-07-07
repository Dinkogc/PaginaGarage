window.addEventListener('DOMContentLoaded', ()=>{
    const fechaInput=document.getElementById('fecha');
    if (fechaInput){
        fechaInput.valueAsDate=new Date();
    }
    mostrarInscripciones();
});
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

function mostrarInscripciones(){
    const inscripciones=JSON.parse(localStorage.getItem("inscripciones")) || [];
    const tbody=document.querySelector("#tabla-inscritos tbody");

    tbody.innerHTML="";

    if (inscripciones.length===0){
        const fila=document.createElement("tr");
        const celda=document.createElement("td");
        celda.colSpan=6;
        celda.textContent="Aún no hay inscripciones registradas.";
        celda.style.textAlign="center";
        fila.appendChild(celda);
        tbody.appendChild(fila);
        return;
    }
    inscripciones.forEach(ins=>{
        const fila=document.createElement("tr");
        fila.innerHTML=`
            <td>${ins.piloto}</td>
            <td>${ins.email}</td>
            <td>${ins.marca}</td>
            <td>${ins.anio}</td>
            <td>${ins.categorias.join(", ")}</td>
            <td>${ins.comentarios}</td>
        `;
        tbody.appendChild(fila);        
    });
}

window.addEventListener('DOMContentLoaded', mostrarInscripciones);

document.getElementById('form-inscripcion').addEventListener('submit', function(){
    setTimeout(mostrarInscripciones, 100);
});

document.getElementById("borrarInscripciones").addEventListener("click", function(){
    const confirmacion=confirm("¿Estás seguro que quieres borrar todas las inscripciones?");
    if(confirmacion){
        localStorage.removeItem("inscripciones");
        mostrarInscripciones();
        document.getElementById("mensajeBorrado").style.display="block";
        setTimeout(()=>{
            document.getElementById("mensajeBorrado").style.display="none";

        }, 3000);
    }
});