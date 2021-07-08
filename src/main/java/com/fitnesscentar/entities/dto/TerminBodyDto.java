package com.fitnesscentar.entities.dto;

import com.fitnesscentar.entities.Termin;

import java.util.Date;

public class TerminBodyDto {
    private long id;
    private Date vremePocetak;
    private double cena;
    private Long sala;
    private int brojPrijavljenih;

    public Long getSala() {
        return sala;
    }

    public void setSala(Long sala) {
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

    public TerminBodyDto() {
    }

    public TerminBodyDto(long id, Date vremePocetak, double cena, Long sala, int brojPrijavljenih) {
        this.id = id;
        this.vremePocetak = vremePocetak;
        this.cena = cena;
        this.sala = sala;
        this.brojPrijavljenih = brojPrijavljenih;
    }

    public static TerminBodyDto build(Termin termin){
        return new TerminBodyDto(
                termin.getId(),
                termin.getVremePocetak(),
                termin.getCena(),
                termin.getSala().getId(),
                termin.getBrojPrijavljenih());
    }


}
