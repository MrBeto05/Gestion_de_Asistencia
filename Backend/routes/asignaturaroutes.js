const express = require("express");
const router = express.Router();
const {
  guardarAsignatura,
  consultarAsignatura,
} = require("../controllers/asignaturacontroller");

router.post("/", guardarAsignatura);
router.get("/", consultarAsignatura);

module.exports = router;