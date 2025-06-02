const express = require("express");
const router = express.Router();
const {
  crearLista,
  registrarAsistencia,
} = require("../controllers/asistenciascontroller");

router.post("/", crearLista);
router.post("/registrar", registrarAsistencia);

module.exports = router;