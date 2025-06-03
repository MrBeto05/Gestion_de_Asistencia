const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const departamentoRoutes = require("../../Backend/routes/departamentoroutes");

const app = express();

// Configuración de CORS
app.use(cors({
  origin: '*' // O especifica tu dominio frontend
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Usa '/' como ruta base en lugar de '/.netlify/functions/departamento'
app.use('/', departamentoRoutes);

exports.handler = serverless(app);