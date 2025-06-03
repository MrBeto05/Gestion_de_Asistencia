const express = require('express');
const router = express.Router();
const {
  consultarDepartamento,
  actualizarDepartamento
} = require('../controllers/departamentocontroller');

// Rutas bien definidas con funciones de controlador
router.get('/', (req, res) => consultarDepartamento(req, res));
router.post('/', (req, res) => actualizarDepartamento(req, res));

module.exports = router;