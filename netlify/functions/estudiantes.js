var express = require('express');
var cors = require("cors");
var serverless = require('serverless-http');
var port = process.env.PORT || 5000;
var app = express();
var estudiantesroutes = require("../../Backend/routes/estudiantesroutes.js");

app.use(express.json());
app.use(cors());

// Middleware de logging (opcional)
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.path} - Body:`, req.body);
  next();
});

var router = express.Router();
router.use("/estudiante", estudiantesroutes);
var handler = app.use('/.netlify/functions', router);

exports.handler = serverless(app);