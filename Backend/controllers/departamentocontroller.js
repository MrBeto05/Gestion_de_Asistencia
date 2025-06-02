const { db, admin } = require("../databases/firebase");

exports.consultarDepartamento = async (req, res) => {
  try {
    const doc = await db.collection("departamentos").doc("principal").get();
    if (!doc.exists) {
      return res.status(404).json({ error: "Departamento no encontrado" });
    }
    res.status(200).json(doc.data());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.actualizarDepartamento = async (req, res) => {
  try {
    const { nombre } = req.body; // Debe coincidir con el nombre enviado desde el frontend

    if (!nombre || typeof nombre !== 'string') {
      return res.status(400).json({ error: "El campo 'nombre' es requerido y debe ser texto" });
    }

    await db.collection("departamentos").doc("principal").set({
      nombre,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });

    return res.status(200).json({
      success: true,
      mensaje: "Departamento actualizado correctamente",
      data: { nombre }
    });
  } catch (error) {
    console.error("Error en actualizarDepartamento:", error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};