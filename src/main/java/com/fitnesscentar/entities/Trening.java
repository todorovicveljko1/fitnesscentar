package com.fitnesscentar.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.sql.Timestamp;
import java.time.Duration;

@Entity
public class Trening {
    @Id
    @GeneratedValue
    private long id;

    private String naziv;
    private String opis;
    private String tipTreninga;
    private Duration trajanje;
    private Timestamp vremePocetak;
    private double cena;

    public Timestamp getVremePocetak() {
        return vremePocetak;
    }

    public void setVremePocetak(Timestamp vremePocetak) {
        this.vremePocetak = vremePocetak;
    }

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

    public Duration getTrajanje() {
        return trajanje;
    }

    public void setTrajanje(Duration trajanje) {
        this.trajanje = trajanje;
    }

    public double getCena() {
        return cena;
    }

    public void setCena(double cena) {
        this.cena = cena;
    }
}
