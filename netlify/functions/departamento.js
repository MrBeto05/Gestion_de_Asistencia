const express = require("express");
const serverless = require("serverless-http");
const departamentoRoutes = require("../../Backend/routes/departamentoroutes");

const app = express();
// Middleware crucial para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  // Para parsear form-data

app.use('/.netlify/functions/departamento', departamentoRoutes);

exports.handler = serverless(app);