const express = require("express");
const router = express.Router();
const {
  guardarEstudiante,
  consultarEstudiante,
} = require("../controllers/estudiantescontrollers");

router.post("/", guardarEstudiante);
router.get("/", consultarEstudiante);

module.exports = router;