// Array para almacenar las listas de asistencia
let listasAsistencia = [];

// Función para crear una nueva lista de asistencia
function crearLista(event) {
  event.preventDefault();

  const semestre = document.getElementById("semestrecrear").value;
  const grupo = document.getElementById("grupocrear").value;
  const codigo = document.getElementById("codigocrear").value;
  const fecha = document.getElementById("fechacrear").value;
  const horaInicio = document.getElementById("horainicrear").value;

  if (!semestre || !grupo || !codigo || !fecha || !horaInicio) {
    alert("Por favor completa todos los campos");
    return;
  }

  const nuevaLista = {
    semestre,
    grupo,
    codigo,
    fecha,
    horaInicio,
    estudiantes: []
  };

  listasAsistencia.push(nuevaLista);
  alert("Lista de asistencia creada correctamente");
}

// Función para buscar una lista de asistencia
function buscarLista(event) {
  event.preventDefault();

  const codigo = document.getElementById("codigollenar").value;
  const fecha = document.getElementById("fechallenar").value;
  const horaInicio = document.getElementById("horainillenar").value;

  if (!codigo || !fecha || !horaInicio) {
    alert("Por favor completa todos los campos");
    return;
  }

  const lista = listasAsistencia.find(
    l => l.codigo === codigo && l.fecha === fecha && l.horaInicio === horaInicio
  );

  if (lista) {
    // Mostrar la lista en la tabla
    const tabla = document.getElementById("tablaAsisLlenar").getElementsByTagName('tbody')[0];
    tabla.innerHTML = "";

    lista.estudiantes.forEach(est => {
      const row = tabla.insertRow();
      row.insertCell(0).textContent = est.tipoDoc;
      row.insertCell(1).textContent = est.numDoc;
      row.insertCell(2).textContent = est.estado;
    });
  } else {
    alert("Lista de asistencia no encontrada");
  }
}

// Función para modificar asistencia
function modificarAsistencia(event) {
  event.preventDefault();

  const codigo = document.getElementById("codigomod").value;
  const semestre = document.getElementById("Semestremod").value;
  const grupo = document.getElementById("grupomod").value;
  const fecha = document.getElementById("fechamod").value;
  const horaInicio = document.getElementById("horainimod").value;
  const tipoDoc = document.getElementById("modTipoDoc").value;
  const numDoc = document.getElementById("numDocMod").value;

  if (!codigo || !semestre || !grupo || !fecha || !horaInicio || !tipoDoc || !numDoc) {
    alert("Por favor completa todos los campos");
    return;
  }

  const lista = listasAsistencia.find(
    l => l.codigo === codigo && l.semestre === semestre &&
         l.grupo === grupo && l.fecha === fecha &&
         l.horaInicio === horaInicio
  );

  if (lista) {
    const estudiante = lista.estudiantes.find(e => e.numDoc === numDoc && e.tipoDoc === tipoDoc);
    if (estudiante) {
      // Aquí iría la lógica para modificar el estado de asistencia
      alert("Asistencia modificada correctamente");
    } else {
      alert("Estudiante no encontrado en la lista");
    }
  } else {
    alert("Lista de asistencia no encontrada");
  }
}

// Función para consultar asistencia
function consultarAsistencia(event) {
  event.preventDefault();

  const codigo = document.getElementById("codigocon").value;
  const semestre = document.getElementById("semestrecon").value;
  const grupo = document.getElementById("grupocon").value;
  const fecha = document.getElementById("fechacon").value;
  const horaInicio = document.getElementById("horainicon").value;

  if (!codigo || !semestre || !grupo || !fecha || !horaInicio) {
    alert("Por favor completa todos los campos");
    return;
  }

  const lista = listasAsistencia.find(
    l => l.codigo === codigo && l.semestre === semestre &&
         l.grupo === grupo && l.fecha === fecha &&
         l.horaInicio === horaInicio
  );

  if (lista) {
    const tabla = document.getElementById("tablaAsisCon").getElementsByTagName('tbody')[0];
    tabla.innerHTML = "";

    lista.estudiantes.forEach(est => {
      const row = tabla.insertRow();
      row.insertCell(0).textContent = est.tipoDoc;
      row.insertCell(1).textContent = est.numDoc;
      row.insertCell(2).textContent = est.estado;
    });
  } else {
    alert("Lista de asistencia no encontrada");
  }
}