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
    headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ nombre: nombre })
  })
  .then(async response => {
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Error del servidor");
    }
    return data;
  })
  .then(data => {
    alert(data.mensaje || "Departamento actualizado correctamente");
    document.getElementById("nomDep").textContent = data.nombre;
    input.value = "";
  })
  .catch(err => {
    console.error("Error completo:", err);
    alert(`Error: ${err.message}`);
  });
}