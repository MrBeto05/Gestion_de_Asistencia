const { db, admin } = require("../databases/firebase");

// Asegúrate de que los métodos sean exportados correctamente
const consultarDepartamento = async (req, res) => {
  try {
    const doc = await db.collection("departamentos").doc("principal").get();

    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        error: "Departamento no encontrado",
        sugerencia: "Crear documento inicial"
      });
    }

    const data = doc.data();
    return res.status(200).json({
      success: true,
      nombre: data.nombre || null,
      ultimaActualizacion: data.updatedAt ? data.updatedAt.toDate().toISOString() : null
    });

  } catch (error) {
    console.error("Error en consulta:", error);
    return res.status(500).json({
      success: false,
      error: "Error interno al consultar",
      details: process.env.NODE_ENV === "development" ? error.message : null
    });
  }
};

const actualizarDepartamento = async (req, res) => {
  try {
    if (!req.body || typeof req.body.nombre !== "string") {
      return res.status(400).json({
        success: false,
        error: "Formato inválido: { nombre: string }"
      });
    }

    const nombre = req.body.nombre.trim();

    if (nombre === "") {
      return res.status(400).json({
        success: false,
        error: "El nombre no puede estar vacío"
      });
    }

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

// Exporta los métodos como un objeto
module.exports = {
  consultarDepartamento,
  actualizarDepartamento
};