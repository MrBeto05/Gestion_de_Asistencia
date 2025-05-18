//integrantes: William David Suarez Briceño y Humberto Pinilla Robayo

function guardarESTDEP {
    event.preventDefault();
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "tipoId": document.getElementById("tiposid").value,
        "id": document.getElementById("nuevoID").value,
        "nombre": document.getElementById("nuevoNom").value
    });

    let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("URL/estudiantes", requestOptions)
        .then((response) => response.text())
        .then((result) => {
            console.log(result);
            alert("Estudiante registrado con éxito");
            // Limpiar el formulario después de guardar
            document.getElementById("tiposid").value = "";
            document.getElementById("nuevoID").value = "";
            document.getElementById("nuevoNom").value = "";
        })
        .catch((error) => console.error(error));
}

function guardarESTASIG{
    event.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "tipoId": document.getElementById("estTipoDoc").value,
        "id": document.getElementById("estNumDoc").value,
        "codigoAsignatura": document.getElementById("estCodAsig").value,
        "grupo": document.getElementById("estGrupo").value,
        "semestre": document.getElementById("estSemestre").value
    });

    let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("URL/asignaturas", requestOptions)
        .then((response) => response.text())
        .then((result) => {
            console.log(result);
            alert("Estudiante registrado en la asignatura con éxito");
            // Limpiar el formulario
            document.getElementById("estTipoDoc").value = "";
            document.getElementById("estNumDoc").value = "";
            document.getElementById("estCodAsig").value = "";
            document.getElementById("estGrupo").value = "";
            document.getElementById("estSemestre").value = "";
        })
        .catch((error) => console.error(error));
}


function cargar(resultado) {
    let transformado = JSON.parse(resultado);
    var salida = "";
    var elemento = "";


    let contenedor = document.getElementById("rta");
    if (!contenedor) {
        contenedor = document.createElement("div");
        contenedor.id = "rta";
        contenedor.className = "info-box";
        
        const formConsulta = document.querySelector("section:nth-of-type(2)");
        formConsulta.appendChild(contenedor);
    }


    if (Array.isArray(transformado)) {
        for (let estudiante of transformado) {
            elemento = "<strong>Información del Estudiante:</strong><br>";
            elemento += "Tipo de ID: " + estudiante.tipoId + "<br>";
            elemento += "ID: " + estudiante.id + "<br>";
            elemento += "Nombre: " + estudiante.nombre + "<br><br>";
            salida += elemento;
        }
    } else {
        salida = "<strong>Información del Estudiante:</strong><br>";
        salida += "Tipo de ID: " + transformado.tipoId + "<br>";
        salida += "ID: " + transformado.id + "<br>";
        salida += "Nombre: " + transformado.nombre + "<br>";
    }

    contenedor.innerHTML = salida;
}




function listar(event) {
    event.preventDefault();
    
    const tipoId = document.getElementById("tid").value;
    const id = document.getElementById("nid").value;

    if (!tipoId || !id) {
        alert("Por favor complete todos los campos");
        return;
    }

    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch(`https://tu-backend.com/api/estudiantes?tipoId=${tipoId}&id=${id}`, requestOptions)
        .then((response) => response.text())
        .then((result) => cargar(result))
        .catch((error) => console.error(error));
}


function modificar(event) {
    event.preventDefault();
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "tipoIdActual": document.getElementById("atid").value,
        "idActual": document.getElementById("mid").value,
        "nuevoTipoId": document.getElementById("ntid").value,
        "nuevoNombre": document.getElementById("Nommod").value
    });

    let requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("URL/estudiantes", requestOptions)
        .then((response) => response.text())
        .then((result) => {
            console.log(result);
            alert("Estudiante modificado con éxito");
            // Limpiar el formulario después de modificar
            document.getElementById("atid").value = "";
            document.getElementById("mid").value = "";
            document.getElementById("ntid").value = "";
            document.getElementById("Nommod").value = "";
        })
        .catch((error) => console.error(error));
}


document.addEventListener("DOMContentLoaded", function() {
    
    const formRegistro = document.querySelector("section:nth-of-type(1) form");
    if (formRegistro) {
        formRegistro.addEventListener("submit", guardarESTDEP);
    }
    
   
    const formConsulta = document.querySelector("section:nth-of-type(2) form");
    if (formConsulta) {
        formConsulta.addEventListener("submit", listar);
    }
    
    
    const formModificacion = document.querySelector("section:nth-of-type(3) form");
    if (formModificacion) {
        formModificacion.addEventListener("submit", modificar);
    }
    const formAsignatura = document.querySelector("section:nth-of-type(4) form");
        if (formAsignatura) {
            formAsignatura.addEventListener("submit", guardarESTASIG);
        }
});