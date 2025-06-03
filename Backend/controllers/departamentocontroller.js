const { db, admin } = require("../databases/firebase");

exports.consultarDepartamento = async (req, res) => {
  try {
    if (!db) throw new Error("No hay conexión a Firebase");

    const doc = await db.collection("departamentos").doc("principal").get();

    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        error: "Documento no encontrado",
        sugerencia: "Crear documento inicial"
      });
    }

    const data = doc.data();
    res.status(200).json({
      success: true,
      nombre: data.nombre || null,
      ultimaActualizacion: data.updatedAt?.toDate()?.toISOString() || null
    });

  } catch (error) {
    console.error("Error en consulta:", error);
    res.status(500).json({
      success: false,
      error: "Error interno al consultar",
      details: process.env.NODE_ENV === "development" ? error.message : null
    });
  }
};

exports.actualizarDepartamento = async (req, res) => {
  try {
    const nombre = req.body?.nombre?.trim();

    if (!nombre) {
      return res.status(400).json({
        success: false,
        error: "Se requiere un nombre válido"
      });
    }

    await db.collection("departamentos").doc("principal").set({
      nombre,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });

    res.status(200).json({
      success: true,
      mensaje: "Departamento actualizado",
      nombre: nombre,
      ultimaActualizacion: new Date().toISOString()
    });

  } catch (error) {
    console.error("Error en actualización:", error);
    res.status(500).json({
      success: false,
      error: "Error interno al actualizar",
      details: process.env.NODE_ENV === "development" ? error.message : null
    });
  }
};