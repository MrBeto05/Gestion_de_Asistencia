function editarDep() {
  const nuevoDep = document.getElementById("nombre").value;

  if (!nuevoDep || nuevoDep.trim() === "") {
    alert("Ingrese un departamento");
    return;
  }

  fetch('/.netlify/functions/departamento', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre: nuevoDep }) // Cambiado de nuevoNombre a nuevoDep
  }) // <-- Se había un punto y coma mal colocado aquí
  .then(res => {
    if (!res.ok) return res.text().then(text => { throw new Error(text) });
    return res.json();
  })
  .then(data => {
    alert(data.mensaje || "Departamento actualizado"); // Mensaje por defecto
  })
  .catch(err => {
    alert("Error al actualizar: " + err.message);
    console.error(err);
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