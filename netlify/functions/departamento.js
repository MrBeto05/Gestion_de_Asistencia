const express = require('express');
const serverless = require('serverless-http');
const admin = require('firebase-admin');

// Inicialización directa de Firebase (evita problemas de rutas)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
    })
  });
}
const db = admin.firestore();

const app = express();

// Middlewares esenciales
app.use(require('cors')());
app.use(express.json());

// Rutas directas (sin archivos externos)
app.get('/', async (req, res) => {
  try {
    const doc = await db.collection("departamentos").doc("principal").get();
    if (!doc.exists) {
      return res.status(404).json({ error: "Documento no encontrado" });
    }
    res.json({ 
      nombre: doc.data().nombre || null,
      ultimaActualizacion: doc.data().updatedAt?.toDate().to