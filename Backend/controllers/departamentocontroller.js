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
    // Debug: Imprime el cuerpo recibido
    console.log("Cuerpo recibido:", req.body);

    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({ error: "Cuerpo de solicitud inválido" });
    }

    const { nombre } = req.body;

    // Validación mejorada
    if (typeof nombre !== 'string' || nombre.trim() === "") {
      return res.status(400).json({
        error: "El campo 'nombre' es requerido y debe ser texto no vacío",
        received: req.body // Para debug
      });
    }

    await db.collection("departamentos").doc("principal").set({
      nombre: nombre.trim(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });

    return res.status(200).json({
      success: true,
      mensaje: `Departamento actualizado a: ${nombre}`,
    });

  } catch (error) {
    console.error("Error en controlador:", error);
    return res.status(500).json({
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};