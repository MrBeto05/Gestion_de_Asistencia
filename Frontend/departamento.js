document.addEventListener('DOMContentLoaded', function() {
  // Verificar si los elementos existen
  const nombreInput = document.getElementById("nombre");
  const nomDepSpan = document.getElementById("nomDep");
  const consultarBtn = document.querySelector("button[onclick='consultarDep()']");
  const modificarBtn = document.querySelector("button[onclick='editarDep()']");

  if (!nombreInput || !nomDepSpan || !consultarBtn || !modificarBtn) {
    console.error("Error: No se encontraron todos los elementos necesarios");
    return;
  }

  // Asignar event listeners directamente (mejor que onclick en HTML)
  consultarBtn.addEventListener('click', consultarDep);
  modificarBtn.addEventListener('click', editarDep);

  // Cargar datos iniciales
  consultarDep();
});

const API_BASE = '/.netlify/functions/departamento';

async function consultarDep() {
  try {
    const response = await fetch(API_BASE);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.error || "Error al consultar el departamento");
    }

    const data = await response.json();
    document.getElementById("nomDep").textContent = data.nombre || "No definido";
    document.getElementById("nombre").value = data.nombre || "";
    
  } catch (error) {
    console.error("Error en consulta:", error);
    alert(`Error al consultar: ${error.message}`);
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
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.error || "Error del servidor");
    }

    const data = await response.json();
    alert(data.mensaje || "Departamento actualizado correctamente");
    document.getElementById("nomDep").textContent = data.nombre || nombre;
    document.getElementById("nombre").value = "";
    
  } catch (error) {
    console.error("Error en actualización:", error);
    alert(`Error: ${error.message}`);
  }
}