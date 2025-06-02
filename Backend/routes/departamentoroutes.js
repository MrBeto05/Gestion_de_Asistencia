const express = require("express");
const router = express.Router();
const {
  consultarDepartamento,
  actualizarDepartamento,
} = require("../controllers/departamentocontroller");

router.get("/", consultarDepartamento);
router.post("/", actualizarDepartamento);

module.exports = router;