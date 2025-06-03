const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const departamentoRoutes = require("../../Backend/routes/departamentoroutes");

const app = express();

// Configuración esencial
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta específica para la función Lambda
app.use('/.netlify/functions/departamento', departamentoRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal!' });
});

// Ruta raíz para testing
app.get('/', (req, res) => {
  res.json({ message: "API funcionando" });
});

exports.handler = serverless(app);