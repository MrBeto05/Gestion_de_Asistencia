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
    const { nombre } = req.body;

    if (!nombre) {
      return res.status(400).json({ error: "El campo 'nombre' es requerido" });
    }

    await db.collection("departamentos").doc("principal").set(
      {
        nombre,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      },
      { merge: true, ignoreUndefinedProperties: true } // ¡Clave para ignorar undefined!
    );

    res.status(200).json({ mensaje: "Departamento actualizado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};