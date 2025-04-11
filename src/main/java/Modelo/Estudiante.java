package Modelo;

public class Estudiante {
    private String Nomb;
    private String Id;
    private String Tid;

    public Estudiante() {
        this.Id = "";
        this.Tid = "";
        this.Nomb = "";
    }
    public Estudiante(String id, String tid, String nomb) {
        this.Id = id;
        this.Tid = tid;
        this.Nomb = nomb;
    }
    public String getNomb() {
        return Nomb;
    }

    public void setNomb(String nomb) {
        Nomb = nomb;
    }

    public String getId() {
        return Id;
    }

    public void setId(String id) {
        Id = id;
    }

    public String getTid() {
        return Tid;
    }

    public void setTid(String tid) {
        Tid = tid;
    }
}
