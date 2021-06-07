package com.fitnesscentar.entities.dto;


import com.fitnesscentar.entities.FitnessCentar;
import com.fitnesscentar.entities.Trening;

public class TreningDto {
    private long id;

    private String naziv;
    private String opis;
    private String tipTreninga;
    private int trajanje;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNaziv() {
        return naziv;
    }

    public void setNaziv(String naziv) {
        this.naziv = naziv;
    }

    public String getOpis() {
        return opis;
    }

    public void setOpis(String opis) {
        this.opis = opis;
    }

    public String getTipTreninga() {
        return tipTreninga;
    }

    public void setTipTreninga(String tipTreninga) {
        this.tipTreninga = tipTreninga;
    }

    public int getTrajanje() {
        return trajanje;
    }

    public TreningDto(long id, String naziv, String opis, String tipTreninga, int trajanje) {
        this.id = id;
        this.naziv = naziv;
        this.opis = opis;
        this.tipTreninga = tipTreninga;
        this.trajanje = trajanje;
    }
    public TreningDto(){}

    public void setTrajanje(int trajanje) {
        this.trajanje = trajanje;
    }

    public static TreningDto build(Trening trening){
        return new TreningDto(
                trening.getId(),
                trening.getNaziv(),
                trening.getOpis(),
                trening.getTipTreninga(),
                trening.getTrajanje()
        );
    }
}
