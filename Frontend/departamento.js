function editarDep() {
  const inputElement = document.getElementById("nombre");
  if (!inputElement) {
    alert("Error: No se encontró el campo de nombre");
    return;
  }

  const nuevoNombre = inputElement.value.trim();
  if (!nuevoNombre) {
    alert("Por favor ingrese un nombre válido");
    return;
  }

  // Debug: Verifica el dato antes de enviarlo
  console.log("Enviando:", { nombre: nuevoNombre });

  fetch('/.netlify/functions/departamento', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nombre: nuevoNombre }) // Asegúrate que sea { nombre: valor }
  })
  .then(async (response) => {
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error del servidor");
    }
    return response.json();
  })
  .then(data => {
    alert(data.mensaje || "Actualización exitosa");
    inputElement.value = ""; // Limpia el campo
  })
  .catch(error => {
    console.error("Error completo:", error);
    alert(`Error: ${error.message}`);
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