package com.fitnesscentar.entities.dto;


import com.fitnesscentar.entities.Termin;
import com.fitnesscentar.entities.Trening;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class TreningTerminDto {
    private long id;

    private String treningNaziv;
    private String treningOpis;
    private String treningTipTreninga;
    private int treningTrajanje;
    private double cena;
    private Date vremePocetka;
    private int brojPrijavljenih;
    private String salaOznaka;
    private int salaKapacitet;

    public TreningTerminDto(
            long id,
            double cena,
            Date vremePocetka,
            int brojPrijavljenih,
            String naziv,
            String opis,
            String tipTreninga,
            int trajanje,
            String salaOznaka,
            int salaKapacitet
    ) {
        this.id = id;
        this.treningNaziv = naziv;
        this.treningOpis = opis;
        this.treningTipTreninga = tipTreninga;
        this.treningTrajanje = trajanje;
        this.cena = cena;
        this.vremePocetka = vremePocetka;
        this.brojPrijavljenih = brojPrijavljenih;
        this.salaOznaka = salaOznaka;
        this.salaKapacitet = salaKapacitet;
    }
    public TreningTerminDto(){}

    public static TreningTerminDto build(Termin termin){

        return new TreningTerminDto(
                termin.getId(),
                termin.getCena(),
                termin.getVremePocetak(),
                termin.getBrojPrijavljenih(),
                termin.getTrening().getNaziv(),
                termin.getTrening().getOpis(),
                termin.getTrening().getTipTreninga(),
                termin.getTrening().getTrajanje(),
                termin.getSala().getOznaka(),
                termin.getSala().getKapacitet()
        );
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTreningNaziv() {
        return treningNaziv;
    }

    public void setTreningNaziv(String treningNaziv) {
        this.treningNaziv = treningNaziv;
    }

    public String getTreningOpis() {
        return treningOpis;
    }

    public void setTreningOpis(String treningOpis) {
        this.treningOpis = treningOpis;
    }

    public String getTreningTipTreninga() {
        return treningTipTreninga;
    }

    public void setTreningTipTreninga(String treningTipTreninga) {
        this.treningTipTreninga = treningTipTreninga;
    }

    public int getTreningTrajanje() {
        return treningTrajanje;
    }

    public void setTreningTrajanje(int treningTrajanje) {
        this.treningTrajanje = treningTrajanje;
    }

    public double getCena() {
        return cena;
    }

    public void setCena(double cena) {
        this.cena = cena;
    }

    public Date getVremePocetka() {
        return vremePocetka;
    }

    public void setVremePocetka(Date vremePocetka) {
        this.vremePocetka = vremePocetka;
    }

    public int getBrojPrijavljenih() {
        return brojPrijavljenih;
    }

    public void setBrojPrijavljenih(int brojPrijavljenih) {
        this.brojPrijavljenih = brojPrijavljenih;
    }

    public String getSalaOznaka() {
        return salaOznaka;
    }

    public void setSalaOznaka(String salaOznaka) {
        this.salaOznaka = salaOznaka;
    }

    public int getSalaKapacitet() {
        return salaKapacitet;
    }

    public void setSalaKapacitet(int salaKapacitet) {
        this.salaKapacitet = salaKapacitet;
    }
}
