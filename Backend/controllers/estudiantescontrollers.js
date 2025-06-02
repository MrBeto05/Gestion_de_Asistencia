const { db, admin } = require("../databases/firebase");

exports.guardarEstudiante = async (req, res) => {
  try {
    const { nombres, tipoId, numeroId } = req.body;

    if (!nombres || !tipoId || !numeroId) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    // Verificar si el estudiante ya existe
    const snapshot = await db.collection("estudiantes")
      .where("numeroId", "==", numeroId)
      .get();

    if (!snapshot.empty) {
      return res.status(409).json({ error: "El estudiante ya existe" });
    }

    // Crear nuevo estudiante
    const docRef = await db.collection("estudiantes").add({
      nombres,
      tipoId,
      numeroId,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(201).json({ id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.consultarEstudiante = async (req, res) => {
  try {
    const { numeroId } = req.query;
    const snapshot = await db.collection("estudiantes")
      .where("numeroId", "==", numeroId)
      .get();

    if (snapshot.empty) {
      return res.status(404).json({ error: "Estudiante no encontrado" });
    }

    const estudiante = snapshot.docs[0].data();
    res.status(200).json({ ...estudiante, id: snapshot.docs[0].id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};