const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const departamentoRoutes = require('../../../Backend/routes/departamentoroutes');

const app = express();

// Middlewares esenciales
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta base para la función Lambda
app.use('/.netlify/functions/departamento', departamentoRoutes);

// Manejador de errores
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Exportación para Netlify Functions
module.exports.handler = serverless(app);