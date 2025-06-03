function editarDep() {
  const input = document.getElementById("nombre");
  if (!input) {
    alert("Error: Campo 'nombre' no encontrado en el HTML");
    return;
  }

  const nombre = input.value.trim();
  if (!nombre) {
    alert("Por favor ingrese un nombre válido");
    return;
  }

  fetch('/.netlify/functions/departamento', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre })
  })
  .then(async (res) => {
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Error del servidor");
    return data;
  })
  .then(data => {
    alert(data.mensaje);
    input.value = "";
    // Actualiza el nombre mostrado después de modificarlo
    document.getElementById("nomDep").textContent = nombre;
  })
  .catch(err => {
    console.error("Error completo:", err);
    alert(`Error: ${err.message}`);
  });
}

function consultarDep() {
  fetch('/.netlify/functions/departamento')
    .then(res => {
      if (!res.ok) throw new Error("No se pudo consultar el departamento");
      return res.json();
    })
    .then(data => {
      document.getElementById("nomDep").textContent = data.nombre || "No definido";
      document.getElementById("nombre").value = data.nombre || "";
    })
    .catch(err => {
      console.error("Error en consulta:", err);
      alert("Error al consultar: " + err.message);
    });
}

// Consultar automáticamente al cargar la página
document.addEventListener('DOMContentLoaded', consultarDep);