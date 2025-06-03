const express = require("express");
const serverless = require("serverless-http");
const departamentoRoutes = require("../../Backend/routes/departamentoroutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/.netlify/functions/departamento', departamentoRoutes);

exports.handler = serverless(app);