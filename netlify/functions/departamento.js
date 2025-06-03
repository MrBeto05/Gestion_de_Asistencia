const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const path = require("path");

// Configura logging detallado
const logger = {
  info: (...args) => console.log('[INFO]', ...args),
  error: (...args) => console.error('[ERROR]', ...args)
};

const departamentoRoutes = require(path.resolve(__dirname, "../../Backend/routes/departamentoroutes"));

const app = express();

// Middleware de logging
app.use((req, res, next) => {
  logger.info(`Recibida petición: ${req.method} ${req.path}`);
  next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/.netlify/functions/departamento", departamentoRoutes);

// Ruta de salud
app.get("/.netlify/functions/departamento/health", (req, res) => {
  logger.info("Health check recibido");
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Manejador de errores mejorado
app.use((err, req, res, next) => {
  logger.error("Error en la aplicación:", err.stack);
  res.status(500).json({
    error: "Algo salió mal",
    details: process.env.NODE_ENV === "development" ? err.message : null
  });
});

exports.handler = serverless(app, {
  callbackWaitsForEmptyEventLoop: false // Importante para Netlify
});