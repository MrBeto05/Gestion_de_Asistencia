const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const path = require("path");

// Configuración de rutas absolutas para desarrollo y producción
let departamentoRoutes;
try {
  // Intenta cargar desde la ubicación de Netlify
  departamentoRoutes = require("/var/task/Backend/routes/departamentoroutes");
} catch (e) {
  // Fallback para desarrollo local
  departamentoRoutes = require(path.join(__dirname, "../../Backend/routes/departamentoroutes"));
}

const app = express();

// Middlewares esenciales
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta base para Netlify Functions
app.use("/", departamentoRoutes);

// Manejador de errores mejorado
app.use((err, req, res, next) => {
  console.error("Error en la aplicación:", err.stack);
  res.status(500).json({
    success: false,
    error: "Error interno del servidor",
    details: process.env.NODE_ENV === "development" ? err.message : null
  });
});

exports.handler = serverless(app);