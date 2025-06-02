const express = require("express");
const serverless = require("serverless-http");
const asistenciasRoutes = require("../../Backend/routes/asistenciaroutes");

const app = express();
app.use(express.json());
app.use("/asistencia", asistenciasRoutes);

exports.handler = serverless(app);