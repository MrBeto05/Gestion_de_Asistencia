const { db, admin } = require("../databases/firebase");

exports.guardarAsignatura = async (req, res) => {
  try {
    const { nombre, grupo, codigo, semestre, creditos } = req.body;

    if (!nombre || !grupo || !codigo || !semestre || creditos == null) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    // Verificar si la asignatura ya existe
    const snapshot = await db.collection("asignaturas")
      .where("codigo", "==", codigo)
      .where("grupo", "==", grupo)
      .where("semestre", "==", semestre)
      .get();

    if (!snapshot.empty) {
      return res.status(409).json({ error: "La asignatura ya existe" });
    }

    // Crear nueva asignatura
    const docRef = await db.collection("asignaturas").add({
      nombre,
      grupo,
      codigo,
      semestre,
      creditos,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(201).json({ id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.consultarAsignatura = async (req, res) => {
  try {
    const { codigo, grupo, semestre } = req.query;
    const snapshot = await db.collection("asignaturas")
      .where("codigo", "==", codigo)
      .where("grupo", "==", grupo)
      .where("semestre", "==", semestre)
      .get();

    if (snapshot.empty) {
      return res.status(404).json({ error: "Asignatura no encontrada" });
    }

    const asignatura = snapshot.docs[0].data();
    res.status(200).json({ ...asignatura, id: snapshot.docs[0].id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.registrarEstudiante = async (req, res) => {
  try {
    const { asignaturaId, estudianteId } = req.body;

    // Validar campos
    if (!asignaturaId || !estudianteId) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    // Registrar en Firestore
    await db.collection("asignaturas").doc(asignaturaId).update({
      estudiantes: admin.firestore.FieldValue.arrayUnion(estudianteId),
    });

    res.status(200).json({ mensaje: "Estudiante registrado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};