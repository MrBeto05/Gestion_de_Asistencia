
const API_URL = '/.netlify/functions/departamento';

document.addEventListener('DOMContentLoaded', () => {
  // Asignar eventos correctamente
  document.querySelector('button[onclick*="consultar"]').addEventListener('click', consultarDep);
  document.querySelector('button[onclick*="editar"]').addEventListener('click', editarDep);

  // Carga inicial
  consultarDep();
});

async function consultarDep() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Error al consultar');
    }

    const data = await response.json();
    document.getElementById("nomDep").textContent = data.nombre || "No definido";
    document.getElementById("nombre").value = data.nombre || "";

  } catch (error) {
    console.error("Error en consulta:", error);
    alert("Error al consultar: " + error.message);
    document.getElementById("nomDep").textContent = "Error al cargar";
  }
}

async function editarDep() {
  const nombre = document.getElementById("nombre").value.trim();

  if (!nombre) {
    alert("Por favor ingrese un nombre válido");
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Error del servidor');
    }

    const data = await response.json();
    alert(data.mensaje || "Nombre actualizado correctamente");
    document.getElementById("nomDep").textContent = data.nombre || nombre;
    document.getElementById("nombre").value = "";

  } catch (error) {
    console.error("Error en actualización:", error);
    alert("Error: " + error.message);
  }
}