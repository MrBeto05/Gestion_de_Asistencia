const { db, admin } = require("../databases/firebase");

exports.consultarDepartamento = async (req, res) => {
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
      ultimaActualizacion: data.updatedAt || null
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

exports.actualizarDepartamento = async (req, res) => {
  try {
    // 1. Validación del body
    if (!req.body || typeof req.body.nombre !== "string") {
      return res.status(400).json({
        error: "Formato inválido: { nombre: string }"
      });
    }

    const nombre = req.body.nombre.trim();

    // 2. Validación del contenido
    if (nombre === "") {
      return res.status(400).json({
        error: "El nombre no puede estar vacío"
      });
    }

    // 3. Actualización en Firestore
    await db.collection("departamentos").doc("principal").set({
      nombre,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true }); // ¡Importante: merge evita sobrescribir otros campos!

    // 4. Respuesta exitosa
    return res.status(200).json({
      success: true,
      mensaje: `Departamento actualizado a: ${nombre}`,
      data: { nombre }
    });

  } catch (error) {
    console.error("Error en actualizarDepartamento:", error);
    return res.status(500).json({
      success: false,
      error: "Error interno al actualizar",
      details: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
};