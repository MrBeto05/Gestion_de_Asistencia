const express = require('express');
const router = express.Router();

let asignaturas = [];

// POST - Crear o actualizar asignatura
router.post('/', async (req, res) => {
  try {
    const { nombre, grupo, codigo, semestre, creditos } = req.body;

    if (!nombre || !grupo || !codigo || !semestre || creditos == null) {
      return res.status(400).json({
        mensaje: "Faltan campos obligatorios"
      });
    }

    const index = asignaturas.findIndex(
      (a) => a.codigo === codigo && a.grupo === grupo && a.semestre === semestre
    );

    if (index !== -1) {
      asignaturas[index] = { nombre, grupo, codigo, semestre, creditos };
      return res.status(200).json({
        mensaje: "Asignatura modificada con éxito"
      });
    }

    asignaturas.push({ nombre, grupo, codigo, semestre, creditos });
    return res.status(200).json({
      mensaje: "Asignatura guardada con éxito"
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error interno",
      error: error.message
    });
  }
});

// GET - Consultar asignatura
router.get('/', async (req, res) => {
  try {
    const { codigo, grupo, semestre } = req.query;

    if (!codigo || !grupo || !semestre) {
      return res.status(400).json({
        mensaje: "Faltan parámetros para consultar"
      });
    }

    const asignatura = asignaturas.find(
      (a) => a.codigo === codigo && a.grupo === grupo && a.semestre === semestre
    );

    if (!asignatura) {
      return res.status(404).json({
        mensaje: "Asignatura no encontrada"
      });
    }

    return res.status(200).json({ asignatura });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error interno",
      error: error.message
    });
  }
});

module.exports = router;