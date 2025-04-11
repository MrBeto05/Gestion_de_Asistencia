package Modelo;

import java.util.ArrayList;

public class Departamento {
    private String nombre;
    private ArrayList<Asignatura> asignaturas = new ArrayList<Asignatura>();
    private ArrayList<Estudiante> estudiantesDepartamento = new ArrayList<>();

    private static Departamento instancia=null;

    public Departamento() {
    }

    public static Departamento singleton(){
        if(instancia==null){
            instancia=new Departamento();
        }
        return instancia;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    //CRUD
    //CREATE , READ , UPDATE, DELETE

    public boolean adicionarAsignatura(String codigo,String nombre,String grupo,String semestre,String creditos) {

        Asignatura nueva = new Asignatura(codigo,nombre, grupo, semestre, creditos);
        asignaturas.add(nueva);
        return true;
    }

    public Asignatura consultarAsignatura(String codigo, String grupo, String semestre) {
        for (Asignatura e : asignaturas) {
            if (e.getCodigo().equalsIgnoreCase(codigo) && e.getGrupo().equalsIgnoreCase(grupo) &&
                    e.getSemestre().equalsIgnoreCase(semestre)) {
                return e;
            }
        }
        return null;
    }

    public boolean actualizarAsignatura(String codigo, String grupo, String semestre, String nombre, String creditos) {
        Asignatura asignatura = this.consultarAsignatura(codigo, grupo, semestre);
        if (asignatura != null) {
            asignatura.setNombre(nombre);
            asignatura.setCreditos(creditos);
            return true;
        }
        return false;
    }

    public boolean borrarAsignatura(String codigo, String grupo, String semestre) {
        for (int vc = 0; vc < asignaturas.size(); vc++) {
            Asignatura copia = asignaturas.get(vc);
            if (copia.getCodigo().equalsIgnoreCase(codigo) && copia.getSemestre().equalsIgnoreCase(semestre)) {
                asignaturas.remove(vc);
                return true;
            }
        }
        return false;
    }

    public boolean registrarEstudianteDepartamento(String numDoc, String tipoDoc, String nombre) {
        if (consultarEstudianteDepartamento(numDoc, tipoDoc) != null) {
            return false;
        }
        estudiantesDepartamento.add(new Estudiante(numDoc, tipoDoc, nombre));
        return true;
    }

    public Estudiante consultarEstudianteDepartamento(String numDoc, String tipoDoc) {
        for (Estudiante e : estudiantesDepartamento) {
            if (e.getId().equalsIgnoreCase(numDoc) && e.getTid().equalsIgnoreCase(tipoDoc)) {
                return e;
            }
        }
        return null;
    }
    public boolean modificarEstudianteDepartamento(String numDoc, String tipoDocActual,
                                                   String tipoDocNuevo, String nombresNuevos) {
        for (Estudiante e : estudiantesDepartamento) {
            if (e.getId().equalsIgnoreCase(numDoc) && e.getTid().equalsIgnoreCase(tipoDocActual)) {
                e.setTid(tipoDocNuevo);
                e.setNomb(nombresNuevos);
                return true;
            }
        }
        return false;
    }

}
