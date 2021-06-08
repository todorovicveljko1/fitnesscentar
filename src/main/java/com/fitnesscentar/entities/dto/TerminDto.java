package com.fitnesscentar.entities.dto;

import com.fitnesscentar.entities.Sala;
import com.fitnesscentar.entities.Termin;

import java.util.Date;

public class TerminDto {
    private long id;
    private Date vremePocetak;
    private double cena;
    private SalaDto sala;
    private int brojPrijavljenih;

    public SalaDto getSala() {
        return sala;
    }

    public void setSala(SalaDto sala) {
        this.sala = sala;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getVremePocetak() {
        return vremePocetak;
    }

    public void setVremePocetak(Date vremePocetak) {
        this.vremePocetak = vremePocetak;
    }

    public double getCena() {
        return cena;
    }

    public void setCena(double cena) {
        this.cena = cena;
    }

    public int getBrojPrijavljenih() {
        return brojPrijavljenih;
    }

    public void setBrojPrijavljenih(int brojPrijavljenih) {
        this.brojPrijavljenih = brojPrijavljenih;
    }

    public TerminDto() {
    }

    public TerminDto(long id, Date vremePocetak, double cena, SalaDto sala, int brojPrijavljenih) {
        this.id = id;
        this.vremePocetak = vremePocetak;
        this.cena = cena;
        this.sala = sala;
        this.brojPrijavljenih = brojPrijavljenih;
    }

    public static TerminDto build(Termin termin){
        return new TerminDto(
                termin.getId(),
                termin.getVremePocetak(),
                termin.getCena(),
                SalaDto.build(termin.getSala()),
                termin.getBrojPrijavljenih());
    }


}
