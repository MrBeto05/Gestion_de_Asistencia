const express = require('express');
const router = express.Router();

// Almacenamiento temporal de asistencias (en producción usarías una base de datos)
let asistencias = [];

// GET - Obtener todas las asistencias o filtrar por parámetros
router.get('/', async (req, res) => {
  try {
    const { codigo, grupo, semestre, fecha, estudiante } = req.query;

    let resultado = asistencias;

    // Filtrar por parámetros si se proporcionan
    if (codigo) {
      resultado = resultado.filter(a => a.codigo === codigo);
    }
    if (grupo) {
      resultado = resultado.filter(a => a.grupo === grupo);
    }
    if (semestre) {
      resultado = resultado.filter(a => a.semestre === semestre);
    }
    if (fecha) {
      resultado = resultado.filter(a => a.fecha === fecha);
    }
    if (estudiante) {
      resultado = resultado.filter(a => a.estudiante === estudiante);
    }

    return res.status(200).json({
      asistencias: resultado,
      total: resultado.length
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error interno del servidor",
      error: error.message
    });
  }
});

// POST - Registrar nueva asistencia
router.post('/', async (req, res) => {
  try {
    const { codigo, grupo, semestre, fecha, estudiante, presente } = req.body;

    // Validar campos obligatorios
    if (!codigo || !grupo || !semestre || !fecha || !estudiante || presente === undefined) {
      return res.status(400).json({
        mensaje: "Faltan campos obligatorios: codigo, grupo, semestre, fecha, estudiante, presente"
      });
    }

    // Verificar si ya existe una asistencia para este estudiante en esta fecha y materia
    const existeAsistencia = asistencias.find(a =>
      a.codigo === codigo &&
      a.grupo === grupo &&
      a.semestre === semestre &&
      a.fecha === fecha &&
      a.estudiante === estudiante
    );

    if (existeAsistencia) {
      // Actualizar asistencia existente
      existeAsistencia.presente = presente;
      existeAsistencia.fechaActualizacion = new Date().toISOString();

      return res.status(200).json({
        mensaje: "Asistencia actualizada con éxito",
        asistencia: existeAsistencia
      });
    }

    // Crear nueva asistencia
    const nuevaAsistencia = {
      id: Date.now().toString(), // ID simple basado en timestamp
      codigo,
      grupo,
      semestre,
      fecha,
      estudiante,
      presente,
      fechaRegistro: new Date().toISOString()
    };

    asistencias.push(nuevaAsistencia);

    return res.status(201).json({
      mensaje: "Asistencia registrada con éxito",
      asistencia: nuevaAsistencia
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error interno del servidor",
      error: error.message
    });
  }
});

// PUT - Actualizar asistencia por ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { presente } = req.body;

    if (presente === undefined) {
      return res.status(400).json({
        mensaje: "El campo 'presente' es obligatorio"
      });
    }

    const asistencia = asistencias.find(a => a.id === id);

    if (!asistencia) {
      return res.status(404).json({
        mensaje: "Asistencia no encontrada"
      });
    }

    asistencia.presente = presente;
    asistencia.fechaActualizacion = new Date().toISOString();

    return res.status(200).json({
      mensaje: "Asistencia actualizada con éxito",
      asistencia
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error interno del servidor",
      error: error.message
    });
  }
});

// DELETE - Eliminar asistencia por ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const index = asistencias.findIndex(a => a.id === id);

    if (index === -1) {
      return res.status(404).json({
        mensaje: "Asistencia no encontrada"
      });
    }

    const asistenciaEliminada = asistencias.splice(index, 1)[0];

    return res.status(200).json({
      mensaje: "Asistencia eliminada con éxito",
      asistencia: asistenciaEliminada
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error interno del servidor",
      error: error.message
    });
  }
});

// GET - Obtener estadísticas de asistencia
router.get('/estadisticas', async (req, res) => {
  try {
    const { codigo, grupo, semestre } = req.query;

    let asistenciasFiltradas = asistencias;

    if (codigo) {
      asistenciasFiltradas = asistenciasFiltradas.filter(a => a.codigo === codigo);
    }
    if (grupo) {
      asistenciasFiltradas = asistenciasFiltradas.filter(a => a.grupo === grupo);
    }
    if (semestre) {
      asistenciasFiltradas = asistenciasFiltradas.filter(a => a.semestre === semestre);
    }

    const totalRegistros = asistenciasFiltradas.length;
    const presentes = asistenciasFiltradas.filter(a => a.presente).length;
    const ausentes = totalRegistros - presentes;
    const porcentajeAsistencia = totalRegistros > 0 ? ((presentes / totalRegistros) * 100).toFixed(2) : 0;

    return res.status(200).json({
      estadisticas: {
        totalRegistros,
        presentes,
        ausentes,
        porcentajeAsistencia: `${porcentajeAsistencia}%`
      }
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error interno del servidor",
      error: error.message
    });
  }
});

module.exports = router;