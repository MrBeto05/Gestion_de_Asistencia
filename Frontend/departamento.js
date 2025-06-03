// URL base para todas las solicitudes
const API_BASE = '/.netlify/functions/departamento';

function editarDep() {
  const input = document.getElementById("nombre");
  const nombre = input.value.trim();

  if (!nombre) {
    alert("Por favor ingrese un nombre válido");
    return;
  }

  fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre })
  })
  .then(response => {
    if (!response.ok) {
      return response.text().then(text => {
        throw new Error(text || 'Error del servidor');
      });
    }
    return response.json();
  })
  .then(data => {
    alert(data.mensaje || "Departamento actualizado correctamente");
    document.getElementById("nomDep").textContent = nombre;
    input.value = "";
  })
  .catch(err => {
    console.error("Error completo:", err);
    alert(`Error: ${err.message}`);
  });
}

function consultarDep() {
  fetch(API_BASE)
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => {
          throw new Error(text || 'Error al consultar');
        });
      }
      return response.json();
    })
    .then(data => {
      document.getElementById("nomDep").textContent = data.nombre || "No definido";
      document.getElementById("nombre").value = data.nombre || "";
    })
    .catch(err => {
      console.error("Error en consulta:", err);
      document.getElementById("nomDep").textContent = "Error al cargar";
      alert("Error al consultar: " + err.message);
    });
}

// Consultar automáticamente al cargar la página
document.addEventListener('DOMContentLoaded', consultarDep);