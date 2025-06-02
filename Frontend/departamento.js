function editarDep() {
  const inputElement = document.getElementById("nombre");
  const nuevoNombre = inputElement ? inputElement.value.trim() : null;

  if (!nuevoNombre) {
    alert("Por favor ingrese un nombre válido");
    return;
  }

  fetch('/.netlify/functions/departamento', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre: nuevoNombre }) // Asegúrate que la clave sea "nombre"
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(err => { throw new Error(err.error || "Error del servidor") });
    }
    return response.json();
  })
  .then(data => {
    alert(data.mensaje || "Departamento actualizado");
    if (inputElement) inputElement.value = ""; // Limpia el input
  })
  .catch(error => {
    console.error("Error:", error);
    alert(error.message);
  });
}

function consultarDep() {
  fetch('/.netlify/functions/departamento')
    .then(res => {
      if (!res.ok) throw new Error("No se pudo consultar el departamento");
      return res.json();
    })
    .then(data => {
      document.getElementById("nombre").value = data.nombre || "";
    })
    .catch(err => {
      alert("Error al consultar: " + err.message);
    });
}