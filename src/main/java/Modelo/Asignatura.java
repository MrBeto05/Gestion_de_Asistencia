package Modelo;

import java.util.ArrayList;

public class Asignatura {
    private String codigo = "";
    private String grupo = "";
    private String semestre = "";
    private String nombre="";
    private String creditos="";
    private ArrayList<Asistencia> asistencias=new ArrayList<Asistencia>();
    private ArrayList<Estudiante> estudiantes = new ArrayList<Estudiante>();
    //2 Arreglos, para Documento y T. Documento.

    public Asignatura() {
        this.codigo = "";
        this.nombre = "";
        this.grupo = "";
        this.semestre = "";
        this.creditos = "";
    }
    public Asignatura(String codigo,String nombre,String grupo,String semestre,String creditos) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.grupo = grupo;
        this.semestre = semestre;
        this.creditos = creditos;
    }
    public String getCodigo() {
        return codigo;
    }
    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }
    public String getGrupo() {
        return grupo;
    }
    public void setGrupo(String grupo) {
        this.grupo = grupo;
    }
    public String getSemestre() {
        return semestre;
    }
    public void setSemestre(String semestre) {
        this.semestre = semestre;
    }
    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCreditos() {
        return creditos;
    }

    public void setCreditos(String creditos) {
        this.creditos = creditos;
    }

    public boolean adicionaAsistencia(String fecha, String horainicial, String horafinal, ArrayList<String> codigos, ArrayList<String> estados){
        Asistencia asistencia=new Asistencia(fecha,horainicial,horafinal);
        for (int vc=0;vc<codigos.size();vc++){
            String codigo=codigos.get(vc);
            String estado=estados.get(vc);
            asistencia.adicionarAsistencia(codigo,estado);
        }
        asistencias.add(asistencia);
        return true;
    }
    public Asistencia consultaAsistencia(String fecha, String horainicial, String horafinal){
        for (int vc=0;vc<asistencias.size();vc++){
            if(asistencias.get(vc).getFecha().equalsIgnoreCase(fecha) &&
                    asistencias.get(vc).getHorainicial().equalsIgnoreCase(horainicial) &&
                    asistencias.get(vc).getHorafinal().equalsIgnoreCase(horafinal)){
                return asistencias.get(vc);
            }
        }
        return null;
    }
    public boolean modificaAsistencia(String fecha, String horainicial, String horafinal, String fechan,String horainicialn, String horafinaln,ArrayList<String> codigos, ArrayList<String> estados){
        Asistencia laasistencia=this.consultaAsistencia(fecha,horainicial,horafinal);
        if (laasistencia!=null){
            laasistencia.setFecha(fechan);
            laasistencia.setHorafinal(horainicialn);
            laasistencia.setHorafinal(horafinaln);
            laasistencia.setCodigos(codigos);
            laasistencia.setEstados(estados);
            return true;
        }
        return false;
    }
    public boolean adicionarEstudiante(String id, String tid, String nomb) {
        Estudiante nuevo = new Estudiante(id, tid, nomb);
        estudiantes.add(nuevo);
        return true;
    }
    public Estudiante consultarEstudiante(String id) {
        for (Estudiante e : estudiantes) {
            if (e.getId().equalsIgnoreCase(id)) {
                return e;
            }
        }
        return null;
    }

    public boolean actualizarEstudiante(String id, String tid, String nomb) {
        Estudiante estudiante = this.consultarEstudiante(id);
        if (estudiante != null) {
            estudiante.setTid(tid);
            estudiante.setNomb(nomb);
            return true;
        }
        return false;
    }

    public boolean borrarEstudiante(String id) {
        for (int i = 0; i < estudiantes.size(); i++) {
            if (estudiantes.get(i).getId().equalsIgnoreCase(id)) {
                estudiantes.remove(i);
                return true;
            }
        }
        return false;
    }
    public ArrayList<Estudiante> getEstudiantes() {
        return estudiantes;
    }

    public boolean llenarAsistencia(String fecha, String horaIni, String horaFin) {
        ArrayList<String> ids = new ArrayList<>();
        ArrayList<String> estados = new ArrayList<>();

        for (Estudiante e : estudiantes) {
            ids.add(e.getId());
            estados.add("2"); // Por defecto ausente
        }

        return adicionaAsistencia(fecha, horaIni, horaFin, ids, estados);
    }
}