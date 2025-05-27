const express = require('express');
const fs = require("fs");
const path = require("path");
const router = express.Router();

const filePath = path.resolve(__dirname, "departamento.txt");

// Función para leer el valor actual
function leerDepartamento() {
  try {
    return fs.readFileSync(filePath, "utf8") || "Ingeniería de Sistemas y Computación";
  } catch {
    return "Ingeniería de Sistemas y Computación";
  }
}

// GET - Obtener nombre del departamento
router.get('/', async (req, res) => {
  try {
    const nombre = leerDepartamento();
    return res.status(200).json({ nombre });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error interno del servidor",
      error: error.message
    });
  }
});

// POST - Actualizar nombre del departamento
router.post('/', async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        mensaje: "Falta el cuerpo de la solicitud"
      });
    }

    const { nombre } = req.body;

    if (!nombre || nombre.trim() === "") {
      return res.status(400).json({
        mensaje: "Falta nombre en el cuerpo"
      });
    }

    fs.writeFileSync(filePath, nombre.trim());

    return res.status(200).json({
      mensaje: "Departamento actualizado con éxito",
      nombre: nombre.trim()
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error interno del servidor",
      error: error.message
    });
  }
});

module.exports = router;