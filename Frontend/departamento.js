function editarDep() {
  const nombreInput = document.getElementById("nombre");
  const nuevoNombre = nombreInput ? nombreInput.value.trim() : null;

  if (!nuevoNombre) {
    alert("Por favor ingrese un nombre válido");
    return;
  }

  fetch('/.netlify/functions/departamento', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre: nuevoNombre })
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(err => { throw new Error(err.error || "Error desconocido") });
    }
    return response.json();
  })
  .then(data => {
    if (data && data.success) {
      alert(data.mensaje);
      // Opcional: Actualizar la UI
      if (nombreInput) nombreInput.value = data.data.nombre;
    } else {
      throw new Error(data.error || "Respuesta inválida del servidor");
    }
  })
  .catch(error => {
    console.error("Error:", error);
    alert("Error: " + error.message);
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