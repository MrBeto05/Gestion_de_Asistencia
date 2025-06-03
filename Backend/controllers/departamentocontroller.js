exports.actualizarDepartamento = async (req, res) => {
  try {
    // Validación mejorada del body
    if (!req.body || typeof req.body.nombre === 'undefined') {
      return res.status(400).json({
        success: false,
        error: "Formato inválido: se requiere { nombre: string }"
      });
    }

    // Asegurar que el nombre es string aunque llegue como otro tipo
    const nombre = String(req.body.nombre).trim();

    if (nombre === "") {
      return res.status(400).json({
        success: false,
        error: "El nombre no puede estar vacío"
      });
    }

    // Actualización en Firestore
    await db.collection("departamentos").doc("principal").set({
      nombre,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });

    return res.status(200).json({
      success: true,
      mensaje: `Departamento actualizado a: ${nombre}`,
      nombre: nombre,
      ultimaActualizacion: new Date().toISOString()
    });

  } catch (error) {
    console.error("Error en actualizarDepartamento:", error);
    return res.status(500).json({
      success: false,
      error: "Error interno al actualizar",
      details: process.env.NODE_ENV === "development" ? error.message : null
    });
  }
};