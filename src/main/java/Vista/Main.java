package Vista;

import Controlador.ElControlador;

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        ElControlador controlador = new ElControlador();
        String opcion = "";

        while (!opcion.equalsIgnoreCase("15")) {
            System.out.println("Gestion de un Departamento\n" +
                    //"1) Crear Departamento\n" +
                    "1) Consultar Departamento\n" +//Mostrar el nombre del departamento
                    "2) Modificar Departamento\n" +//Cambiar el nombre del departamento
                    "3) Registrar Estudiante en Departamento\n" +//Nombre C., T. Documento, N. Documento.
                    "4) Consultar Estudiante en Departamento\n" +//T. Documento y N. Documento. Y Mostrar los nombres completos del Estudiante
                    "5) Modificar Estudiante en Departamento\n" +//Se busca por T. Documento y N. DOcumento y se Cambia T. Documento y Nombres Completos
                    "6) Agregar Asignatura\n" +//Debe tener nombre, código, sección-grupo, semestre, creditos.
                    "7) Consultar Asignatura\n" +//Criterios de búsqueda: código, grupo, semestre. Debe mostrar Nombre y Creditos
                    "8) Modificar Asignatura\n" +//Criterios de búsqueda: código, grupo, semestre. Cambiar Nombre o Creditos
                    "9) Registrar Estudiante en Asignatura\n" +//T. Documento, N. Documento, Semestre, codigo A, Grupo.
                    "10) Consultar Estudiante en Asignatura\n" +//Se busca con. codigo, Semestre y Grupo. Devuelve Listas de N. Documento y T. Documento
                    "11) Crear Lista de Asistencia Vacía \n" +//Criterio: codigo, semestre, grupo, fecha, hora. Retorna T. Documento, N. Documento y estado: no asistio.
                    "12) Llenar Asistencia\n" +//
                    "13) Modificar Asistencia\n" +//codigo, semestre, grupo, fecha, hora, t. documento, n. documento. Cambia estado
                    "14) Mostrar Asistencia\n" +//codigo, semestre, grupo, fecha, hora. Listas Documento, T. Documento., Estado
                    "15) Salir\n" +
                    "Digite la opcion deseada: ");

            opcion = scanner.nextLine();
            if (opcion.equals("1")) {
                System.out.println(controlador.consultarNombreDepartamento());
            } else if (opcion.equals("2")) {
                System.out.println("Ingrese el nuevo Nombre Departamento:");
                String nombre = scanner.nextLine();
                System.out.println(controlador.modificarNombreDepartamento(nombre));
            } else if (opcion.equals("3")) {
                System.out.println("Registrar Estudiante en Departamento");
                System.out.println("Ingrese ID del estudiante:");
                String idDept = scanner.nextLine();
                System.out.println("Ingrese tipo de ID:");
                String tipoIdDept = scanner.nextLine();
                System.out.println("Ingrese nombre completo:");
                String nombreDept = scanner.nextLine();
                System.out.println(controlador.registrarEstudianteDepartamento(idDept, tipoIdDept, nombreDept));
            } else if (opcion.equals("4")) {
                System.out.println("Consultar Estudiante en Departamento:");
                System.out.println("Ingrese tipo de documento:");
                String tipoDoc = scanner.nextLine();
                System.out.println("Ingrese número de documento:");
                String numDoc = scanner.nextLine();
                System.out.println(controlador.consultarEstudianteDepartamento(numDoc, tipoDoc));
            } else if (opcion.equals("5")) {
                System.out.println("Modificar Estudiante en Departamento:");
                System.out.println("Ingrese tipo de documento actual:");
                String tipoDocActual = scanner.nextLine();
                System.out.println("Ingrese número de documento:");
                String numDoc = scanner.nextLine();
                System.out.println("Ingrese nuevo tipo de documento:");
                String tipoDocNuevo = scanner.nextLine();
                System.out.println("Ingrese nuevos nombres completos:");
                String nombresNuevos = scanner.nextLine();
                System.out.println(controlador.modificarEstudianteDepartamento(numDoc, tipoDocActual, tipoDocNuevo, nombresNuevos));
            } else if (opcion.equals("6")) {
                System.out.println("Agregar Asignatura");
                System.out.println("Ingrese el nombre de la Asignatura:");
                String nassig = scanner.nextLine();
                System.out.println("Ingrese el codigo de la Asignatura:");
                String codassig = scanner.nextLine();
                System.out.println("Ingrese el semestre de la Asignatura:");
                String semassig = scanner.nextLine();
                System.out.println("Ingrese el grupo de la Asignatura:");
                String grupassig = scanner.nextLine();
                System.out.println("Ingrese los creditos de la Asignatura:");
                String creassig = scanner.nextLine();
                System.out.println(controlador.adicionarAsignatura(codassig, nassig, grupassig, semassig, creassig));
            } else if (opcion.equals("7")) {
                System.out.println("Consultar Asignatura");
                System.out.println("Ingrese el codigo:");
                String cod = scanner.nextLine();
                System.out.println("Ingrese el grupo:");
                String grup = scanner.nextLine();
                System.out.println("Ingrese el semestre:");
                String sem = scanner.nextLine();
                System.out.println(controlador.consultarAsignatura(cod, grup, sem));
            } else if (opcion.equals("8")) {
                System.out.println("Modificar Asignatura");
                System.out.println("Ingrese codigo:");
                String cod = scanner.nextLine();
                System.out.println("Ingrese grupo:");
                String grup = scanner.nextLine();
                System.out.println("Ingrese semestre:");
                String sem = scanner.nextLine();
                System.out.println("Ingrese nuevo nombre:");
                String nom = scanner.nextLine();
                System.out.println("Ingrese nuevos creditos:");
                String cred = scanner.nextLine();
                System.out.println(controlador.actualizarAsignatura(cod, grup, sem, nom, cred));
            } else if (opcion.equals("9")) {
                System.out.println("Registrar Estudiante en Asignatura");
                System.out.println("Ingrese tipo de documento:");
                String tipoDoc = scanner.nextLine();
                System.out.println("Ingrese número de documento:");
                String numDoc = scanner.nextLine();
                System.out.println("Ingrese semestre:");
                String semestre = scanner.nextLine();
                System.out.println("Ingrese código de asignatura:");
                String codAsig = scanner.nextLine();
                System.out.println("Ingrese grupo:");
                String grupo = scanner.nextLine();
                System.out.println(controlador.registrarEstudianteEnAsignatura(numDoc, tipoDoc, semestre, codAsig, grupo));
            } else if (opcion.equals("10")) {
                System.out.println("Consultar Estudiante en Asignatura:");
                System.out.println("Ingrese código de asignatura:");
                String codAsig = scanner.nextLine();
                System.out.println("Ingrese semestre:");
                String semestre = scanner.nextLine();
                System.out.println("Ingrese grupo:");
                String grupo = scanner.nextLine();
                System.out.println(controlador.consultarEstudiantesAsignatura(codAsig, semestre, grupo));
            } else if (opcion.equals("11")) {
                System.out.println("Crear Lista Vacía de Asistencia");
                System.out.println("Ingrese código de asignatura:");
                String codAsigLista = scanner.nextLine();
                System.out.println("Ingrese grupo:");
                String grupoLista = scanner.nextLine();
                System.out.println("Ingrese semestre:");
                String semestreLista = scanner.nextLine();
                System.out.println("Ingrese fecha (aaaa/mm/dd):");
                String fechaLista = scanner.nextLine();
                System.out.println("Ingrese hora inicial:");
                String horaIniLista = scanner.nextLine();
                System.out.println("Ingrese hora final:");
                String horaFinLista = scanner.nextLine();
                System.out.println(controlador.crearListaAsistenciaVacia(codAsigLista, grupoLista, semestreLista,
                        fechaLista, horaIniLista, horaFinLista));
            } else if (opcion.equals("12")) {
                System.out.println("Llenar Asistencia");
                System.out.println("Ingrese código de asignatura:");
                String codAsig = scanner.nextLine();
                System.out.println("Ingrese semestre:");
                String semestre = scanner.nextLine();
                System.out.println("Ingrese grupo:");
                String grupo = scanner.nextLine();
                System.out.println("Ingrese fecha (aaaa/mm/dd):");
                String fecha = scanner.nextLine();
                System.out.println("Ingrese hora inicial:");
                String horaIni = scanner.nextLine();
                System.out.println("Ingrese hora final:");
                String horaFin = scanner.nextLine();
                String respuesta = controlador.llenarAsistencia(codAsig, semestre, grupo, fecha, horaIni, horaFin);
                if (respuesta.startsWith("INICIAR_LLENADO_ASISTENCIA")) {
                    String[] datos = respuesta.split(":");
                    codAsig = datos[1];
                    grupo = datos[2];
                    semestre = datos[3];
                    fecha = datos[4];
                    horaIni = datos[5];
                    horaFin = datos[6];

                    int indiceEstudiante = 0;
                    while (true) {
                        String estudianteInfo = controlador.obtenerSiguienteEstudiante(
                                codAsig, grupo, semestre, fecha, horaIni, horaFin, indiceEstudiante);

                        if (estudianteInfo.startsWith("FIN:")) {
                            System.out.println(estudianteInfo.split(":")[1]);
                            break;
                        }

                        String[] estudianteData = estudianteInfo.split(":");
                        String numDoc = estudianteData[1];
                        String tipoDoc = estudianteData[2];
                        String nombre = estudianteData[3];

                        System.out.println("\nEstudiante: " + nombre + " (" + tipoDoc + ": " + numDoc + ")");
                        System.out.println("Ingrese estado (0:Asistió, 1:Tarde, 2:Ausente):");
                        String estado = scanner.nextLine();
                        String resultado = controlador.procesarEstudianteAsistencia(
                                codAsig, grupo, semestre, fecha, horaIni, horaFin, numDoc, estado);

                        if (!resultado.equals("ESTADO_ACTUALIZADO")) {
                            System.out.println("Error al actualizar: " + resultado);
                        }

                        indiceEstudiante++;
                    }
                } else {
                    System.out.println(respuesta);
                }
            } else if (opcion.equals("13")) {
                System.out.println("Ingrese código de asignatura:");
                String codAsig = scanner.nextLine();
                System.out.println("Ingrese semestre:");
                String semestre = scanner.nextLine();
                System.out.println("Ingrese grupo:");
                String grupo = scanner.nextLine();
                System.out.println("Ingrese fecha (aaaa/mm/dd):");
                String fecha = scanner.nextLine();
                System.out.println("Ingrese hora inicial:");
                String horaIni = scanner.nextLine();
                System.out.println("Ingrese hora final:");
                String horaFin = scanner.nextLine();
                System.out.println("Ingrese tipo de documento:");
                String tipoDoc = scanner.nextLine();
                System.out.println("Ingrese número de documento:");
                String numDoc = scanner.nextLine();
                System.out.println("Ingrese nuevo estado (0:Asistió, 1:Tarde, 2:Ausente):");
                String estado = scanner.nextLine();
                System.out.println(controlador.modificarAsistencia(codAsig, semestre, grupo, fecha, horaIni, horaFin, numDoc, tipoDoc, estado));

            } else if (opcion.equals("14")) {
                System.out.println("Mostrar Asistencia");
                System.out.println("Ingrese código de asignatura:");
                String codAsig = scanner.nextLine();
                System.out.println("Ingrese grupo:");
                String grupo = scanner.nextLine();
                System.out.println("Ingrese semestre:");
                String semestre = scanner.nextLine();
                System.out.println("Ingrese fecha (aaaa/mm/dd):");
                String fecha = scanner.nextLine();
                System.out.println("Ingrese hora inicial:");
                String horaIni = scanner.nextLine();
                System.out.println("Ingrese hora final:");
                String horaFin = scanner.nextLine();

                System.out.println(controlador.mostrarAsistencia(codAsig, grupo, semestre, fecha, horaIni, horaFin));

            } else if (opcion.equals("15")) {
                System.out.println("Saliendo del sistema...");
            } else {
                System.out.println("Opción inválida");
            }
        }
    }
}