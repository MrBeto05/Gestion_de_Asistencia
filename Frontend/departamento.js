function editarDep() {
  const nuevoNombre = document.getElementById("nombre").value.trim(); // Usa const y asegura trim()

  if (!nuevoNombre) {
    alert("Ingrese un nombre válido");
    return;
  }

  fetch('/.netlify/functions/departamento', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre: nuevoNombre }) // Asegúrate de que la clave sea "nombre"
  })
  .then(res => res.json())
  .then(data => alert(data.mensaje))
  .catch(err => alert("Error: " + err.message));
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