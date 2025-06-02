const { db, admin } = require("../databases/firebase");

exports.crearLista = async (req, res) => {
  try {
    const { codigo, fecha, horaInicio, grupo, semestre } = req.body;

    // Verificar si la lista ya existe
    const snapshot = await db.collection("asistencias")
      .where("codigo", "==", codigo)
      .where("fecha", "==", fecha)
      .where("horaInicio", "==", horaInicio)
      .get();

    if (!snapshot.empty) {
      return res.status(409).json({ error: "La lista ya existe" });
    }

    // Crear nueva lista
    const docRef = await db.collection("asistencias").add({
      codigo,
      fecha,
      horaInicio,
      grupo,
      semestre,
      estudiantes: [],
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(201).json({ id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.registrarAsistencia = async (req, res) => {
  try {
    const { listaId, estudianteId, presente } = req.body;

    // Actualizar la lista de asistencia
    await db.collection("asistencias").doc(listaId).update({
      estudiantes: admin.firestore.FieldValue.arrayUnion({
        estudianteId,
        presente,
        fechaRegistro: new Date().toISOString(),
      }),
    });

    res.status(200).json({ mensaje: "Asistencia registrada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};