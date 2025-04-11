package Controlador;

import Modelo.Departamento;
import Modelo.Asignatura;
import Modelo.Asistencia;
import Modelo.Estudiante;
import java.util.ArrayList;

public class ElControlador {
    private Departamento departamento = null;

    public ElControlador() {
        departamento = Departamento.singleton();
    }

    public String crearDepartamento(String nombre) {
        departamento.setNombre(nombre);
        return "Departamento creado: " + nombre;
    }

    public String consultarNombreDepartamento() {
        return departamento.getNombre();
    }

    public String modificarNombreDepartamento(String nombre) {
        departamento.setNombre(nombre);
        return "Nombre actualizado: " + nombre;
    }

    public String adicionarAsignatura(String codigo, String nombre,String grupo, String semestre,  String creditos) {
        boolean res = departamento.adicionarAsignatura(codigo, nombre,grupo, semestre,  creditos);
        return res ? "Asignatura agregada exitosamente." : "Error al agregar asignatura.";
    }

    public String consultarAsignatura(String codigo, String grupo, String semestre) {
        Asignatura asig = departamento.consultarAsignatura(codigo, grupo, semestre);
        return asig != null ? "Nombre: " + asig.getNombre() + ", Creditos: " + asig.getCreditos() : "Asignatura no encontrada.";
    }

    public String actualizarAsignatura(String codigo, String grupo, String semestre, String nombre, String creditos) {
        boolean res = departamento.actualizarAsignatura(codigo, grupo, semestre, nombre, creditos);
        return res ? "Asignatura actualizada." : "Error al actualizar.";
    }
    public String registrarEstudianteDepartamento(String numDoc, String tipoDoc, String nombre) {
        boolean resultado = departamento.registrarEstudianteDepartamento(numDoc, tipoDoc, nombre);
        return resultado ? "Estudiante registrado exitosamente"
                : "Error: Estudiante ya existe o datos inválidos";
    }

    public String registrarEstudianteEnAsignatura(String numDoc, String tipoDoc, String semestre,
                                                  String codAsig, String grupo) {
        Estudiante estudiante = departamento.consultarEstudianteDepartamento(numDoc, tipoDoc);
        if (estudiante == null) {
            return "Error: Estudiante no registrado en el departamento";
        }

        Asignatura asignatura = departamento.consultarAsignatura(codAsig, grupo, semestre);
        if (asignatura == null) {
            return "Error: Asignatura no encontrada";
        }

        boolean resultado = asignatura.adicionarEstudiante(estudiante.getId(), estudiante.getTid(), estudiante.getNomb());
        return resultado ? "Estudiante registrado en asignatura exitosamente"
                : "Error al registrar en asignatura";
    }

    public String crearListaAsistenciaVacia(String codAsig, String grupo, String semestre,
                                            String fecha, String horaIni, String horaFin) {
        Asignatura asignatura = departamento.consultarAsignatura(codAsig, grupo, semestre);
        if (asignatura == null) {
            return "Error: Asignatura no encontrada.";
        }

        ArrayList<String> idsEstudiantes = new ArrayList<>();
        ArrayList<String> estados = new ArrayList<>();
        for (Estudiante e : asignatura.getEstudiantes()) {
            idsEstudiantes.add(e.getId());
            estados.add("2");
        }

        boolean res = asignatura.adicionaAsistencia(fecha, horaIni, horaFin, idsEstudiantes, estados);
        return res ? "Lista de asistencia creada con estudiantes (Ausentes por defecto)."
                : "Error al crear lista de asistencia.";
    }
    public String consultarEstudianteDepartamento(String numDoc, String tipoDoc) {
        Estudiante estudiante = departamento.consultarEstudianteDepartamento(numDoc, tipoDoc);
        if (estudiante == null) {
            return "Estudiante no encontrado";
        }
        return "Estudiante: " + estudiante.getNomb() +
                "\nTipo Doc: " + estudiante.getTid() +
                "\nNúmero Doc: " + estudiante.getId();
    }

    public String modificarEstudianteDepartamento(String numDoc, String tipoDocActual,
                                                  String tipoDocNuevo, String nombresNuevos) {
        boolean resultado = departamento.modificarEstudianteDepartamento(
                numDoc, tipoDocActual, tipoDocNuevo, nombresNuevos);
        return resultado ? "Estudiante modificado exitosamente"
                : "Error: Estudiante no encontrado";
    }

    public String consultarEstudiantesAsignatura(String codAsig, String semestre, String grupo) {
        Asignatura asignatura = departamento.consultarAsignatura(codAsig, grupo, semestre);
        if (asignatura == null) {
            return "Asignatura no encontrada";
        }

        StringBuilder resultado = new StringBuilder("Estudiantes inscritos:\n");
        for (Estudiante e : asignatura.getEstudiantes()) {
            resultado.append(e.getNomb())
                    .append(" - ").append(e.getTid())
                    .append(": ").append(e.getId())
                    .append("\n");
        }
        return resultado.toString();
    }
    public String llenarAsistencia(String codAsig, String semestre, String grupo,
                                   String fecha, String horaIni, String horaFin) {
        Asignatura asignatura = departamento.consultarAsignatura(codAsig, grupo, semestre);
        if (asignatura == null) {
            return "Error: Asignatura no encontrada.";
        }

        Asistencia asistencia = asignatura.consultaAsistencia(fecha, horaIni, horaFin);
        if (asistencia == null) {
            return "Error: No hay lista de asistencia para esta fecha/hora.";
        }

        ArrayList<Estudiante> estudiantes = asignatura.getEstudiantes();
        if (estudiantes.isEmpty()) {
            return "Error: No hay estudiantes inscritos en esta asignatura.";
        }
        return "INICIAR_LLENADO_ASISTENCIA:" + codAsig + ":" + grupo + ":" + semestre + ":" + fecha + ":" + horaIni + ":" + horaFin;
    }

    public String procesarEstudianteAsistencia(String codAsig, String grupo, String semestre,
                                               String fecha, String horaIni, String horaFin,
                                               String numDoc, String estado) {
        Asignatura asignatura = departamento.consultarAsignatura(codAsig, grupo, semestre);
        if (asignatura == null) {
            return "Error: Asignatura no encontrada.";
        }

        Asistencia asistencia = asignatura.consultaAsistencia(fecha, horaIni, horaFin);
        if (asistencia == null) {
            return "Error: No hay lista de asistencia para esta fecha/hora.";
        }

        boolean resultado = asistencia.modificarAsistencia(numDoc, estado);
        return resultado ? "ESTADO_ACTUALIZADO" : "Error: No se pudo actualizar el estado.";
    }

    public String obtenerSiguienteEstudiante(String codAsig, String grupo, String semestre,
                                             String fecha, String horaIni, String horaFin,
                                             int indiceActual) {
        Asignatura asignatura = departamento.consultarAsignatura(codAsig, grupo, semestre);
        if (asignatura == null) {
            return "FIN:Asignatura no encontrada";
        }

        ArrayList<Estudiante> estudiantes = asignatura.getEstudiantes();
        if (indiceActual >= estudiantes.size()) {
            return "FIN:Todos los estudiantes procesados";
        }

        Estudiante estudiante = estudiantes.get(indiceActual);
        return "ESTUDIANTE:" + estudiante.getId() + ":" + estudiante.getTid() + ":" + estudiante.getNomb();
    }

    public String mostrarAsistencia(String codAsig, String semestre, String grupo,
                                    String fecha, String horaIni, String horaFin) {
        Asignatura asignatura = departamento.consultarAsignatura(codAsig, grupo, semestre);
        if (asignatura == null) {
            return "Error: Asignatura no encontrada";
        }

        Asistencia asistencia = asignatura.consultaAsistencia(fecha, horaIni, horaFin);
        if (asistencia == null) {
            return "No se encontró registro de asistencia";
        }

        StringBuilder resultado = new StringBuilder("Registro de asistencia:\n");
        for (int i = 0; i < asistencia.getCodigos().size(); i++) {
            Estudiante e = asignatura.consultarEstudiante(asistencia.getCodigos().get(i));
            String estado = asistencia.getEstados().get(i).equals("0") ? "Asistió" :
                    asistencia.getEstados().get(i).equals("1") ? "Tarde" : "Ausente";

            resultado.append(e.getNomb())
                    .append(" (").append(e.getTid()).append(": ").append(e.getId()).append(")")
                    .append(" - ").append(estado)
                    .append("\n");
        }
        return resultado.toString();
    }
    public String modificarAsistencia(String codAsig, String grupo, String semestre,
                                      String fecha, String horaIni, String horaFin,
                                      String numDoc, String tipoDoc, String estado) {
        Asignatura asignatura = departamento.consultarAsignatura(codAsig, grupo, semestre);
        if (asignatura == null) {
            return "Error: Asignatura no encontrada";
        }

        Asistencia asistencia = asignatura.consultaAsistencia(fecha, horaIni, horaFin);
        if (asistencia == null) {
            return "Error: No existe registro de asistencia para esa fecha/hora";
        }

        Estudiante estudiante = departamento.consultarEstudianteDepartamento(numDoc, tipoDoc);
        if (estudiante == null) {
            return "Error: Estudiante no encontrado";
        }

        boolean resultado = asistencia.modificarAsistencia(estudiante.getId(), estado);
        return resultado ? "Asistencia actualizada correctamente"
                : "Error al actualizar asistencia";
    }
}