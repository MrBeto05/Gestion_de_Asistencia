const express = require("express");
const serverless = require("serverless-http");
const departamentoRoutes = require("../../Backend/routes/departamentoroutes");

const app = express();
app.use(express.json());
app.use('/.netlify/functions/departamento', router);

exports.handler = serverless(app);