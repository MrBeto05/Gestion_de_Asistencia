const express = require("express");
const router = express.Router();
const departamentoController = require("../controllers/departamentocontroller");

// Asegúrate de que los controladores sean funciones
router.get("/", departamentoController.consultarDepartamento);
router.post("/", departamentoController.actualizarDepartamento);

module.exports = router;