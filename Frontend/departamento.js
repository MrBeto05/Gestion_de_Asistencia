const API_URL = '/.netlify/functions/departamento';

async function handleRequest(url, options = {}) {
  try {
    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      ...options
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error del servidor');
    }

    return await response.json();
  } catch (error) {
    console.error('Error en la solicitud:', error);
    throw error;
  }
}

export function consultarDep() {
  return handleRequest(API_URL)
    .then(data => {
      document.getElementById("nomDep").textContent = data.nombre || "No definido";
      document.getElementById("nombre").value = data.nombre || "";
    })
    .catch(err => {
      alert("Error al consultar: " + err.message);
    });
}

export function editarDep() {
  const nombre = document.getElementById("nombre").value.trim();

  if (!nombre) {
    alert("Por favor ingrese un nombre válido");
    return Promise.resolve();
  }

  return handleRequest(API_URL, {
    method: 'POST',
    body: JSON.stringify({ nombre })
  })
  .then(data => {
    alert(data.mensaje || "Actualización exitosa");
    return consultarDep(); // Refrescar los datos
  })
  .catch(err => {
    alert("Error al actualizar: " + err.message);
  });
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('consultarBtn')?.addEventListener('click', consultarDep);
  document.getElementById('editarBtn')?.addEventListener('click', editarDep);
  consultarDep(); // Carga inicial
});