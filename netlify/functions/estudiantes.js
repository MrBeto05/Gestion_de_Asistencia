const express = require("express");
const serverless = require("serverless-http");
const estudiantesRoutes = require("../../Backend/routes/estudiantesroutes");

const app = express();
app.use(express.json());
app.use("/estudiantes", estudiantesRoutes);

exports.handler = serverless(app);