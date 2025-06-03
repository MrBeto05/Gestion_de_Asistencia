const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const path = require("path");

// Importa las rutas usando rutas absolutas para evitar problemas
const departamentoRoutes = require(path.resolve(__dirname, "../../Backend/routes/departamentoroutes"));

const app = express();

// Configuración básica
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Usa las rutas
app.use("/.netlify/functions/departamento", departamentoRoutes);

// Ruta de prueba
app.get("/.netlify/functions/departamento/test", (req, res) => {
  res.json({ message: "Ruta de prueba funcionando" });
});

// Manejador de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Algo salió mal!" });
});

exports.handler = serverless(app);