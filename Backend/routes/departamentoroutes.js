const express = require("express");
const router = express.Router();
const path = require("path");

// Carga segura del controlador
let departamentoController;
try {
  departamentoController = require("/var/task/Backend/controllers/departamentocontroller");
} catch (e) {
  departamentoController = require(path.join(__dirname, "../controllers/departamentocontroller"));
}

// Rutas
router.get("/", departamentoController.consultarDepartamento);
router.post("/", departamentoController.actualizarDepartamento);

module.exports = router;