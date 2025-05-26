let estudiantes = [];

// Función para guardar un estudiante nuevo
function guardarEst() {
  const nombres = document.getElementById("nombresAgregar").value.trim();
  const tipoId = document.getElementById("tipoIdAgregar").value.trim();
  const numeroId = document.getElementById("numeroIdAgregar").value.trim();

  if (!nombres || !tipoId || !numeroId) {
    alert("Por favor, llena todos los campos para agregar estudiante.");
    return;
  }

  // Verificar si el estudiante ya existe por número de documento
  const existe = estudiantes.find(est => est.numeroId === numeroId);
  if (existe) {
    alert("El estudiante ya está registrado.");
    return;
  }

  estudiantes.push({ nombres, tipoId, numeroId });
  alert("Estudiante guardado con éxito.");

  // Limpiar campos
  document.getElementById("nombresAgregar").value = "";
  document.getElementById("tipoIdAgregar").value = "";
  document.getElementById("numeroIdAgregar").value = "";
  mostrarEstudiantes();
}

// Función para consultar estudiante
function consultarEstudiante() {
  const numeroId = document.getElementById("numeroIdConsultar").value.trim();
  const tipoId = document.getElementById("tipoIdConsultar").value.trim();

  if (!numeroId || !tipoId) {
    alert("Por favor, llena todos los campos para consultar.");
    return;
  }

  const estudiante = estudiantes.find(est =>
    est.numeroId === numeroId && est.tipoId === tipoId
  );

  if (estudiante) {
    alert(`Estudiante encontrado:\nNombres: ${estudiante.nombres}\nTipo ID: ${estudiante.tipoId}\nNúmero ID: ${estudiante.numeroId}`);
  } else {
    alert("Estudiante no encontrado.");
  }
}

// Función para editar estudiante existente
function editarEst() {
  const numeroId = document.getElementById("numeroIdModificar").value.trim();
  const nuevosNombres = document.getElementById("nuevosNombres").value.trim();
  const nuevoTipoId = document.getElementById("tipoIdModificar").value.trim();

  if (!numeroId || !nuevosNombres || !nuevoTipoId) {
    alert("Por favor, llena todos los campos para modificar estudiante.");
    return;
  }

  const index = estudiantes.findIndex(est => est.numeroId === numeroId);

  if (index === -1) {
    alert("Estudiante no encontrado para modificar.");
    return;
  }

  estudiantes[index].nombres = nuevosNombres;
  estudiantes[index].tipoId = nuevoTipoId;

  alert("Estudiante modificado con éxito.");

  // Limpiar campos
  document.getElementById("numeroIdModificar").value = "";
  document.getElementById("nuevosNombres").value = "";
  document.getElementById("tipoIdModificar").value = "";

  mostrarEstudiantes();
}

// Función para mostrar estudiantes
function mostrarEstudiantes() {
  const parrafo = document.getElementById("parrafo");
  if (estudiantes.length === 0) {
    parrafo.innerText = "No hay estudiantes registrados.";
    return;
  }
  let texto = "Estudiantes registrados:\n";
  estudiantes.forEach(est => {
    texto += `- ${est.nombres} | ${est.tipoId} | ${est.numeroId}\n`;
  });
  parrafo.innerText = texto;
}

// Inicializar lista vacía al cargar
mostrarEstudiantes();