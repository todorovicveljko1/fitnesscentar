package com.fitnesscentar.entities.dto;


import com.fitnesscentar.entities.Sala;
import com.fitnesscentar.entities.Termin;

public class SalaDto {
    private long id;
    private int kapacitet;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getKapacitet() {
        return kapacitet;
    }

    public void setKapacitet(int kapacitet) {
        this.kapacitet = kapacitet;
    }

    public String getOznaka() {
        return oznaka;
    }

    public void setOznaka(String oznaka) {
        this.oznaka = oznaka;
    }

    private String oznaka;

    public SalaDto(long id, int kapacitet, String oznaka) {
        this.id = id;
        this.kapacitet = kapacitet;
        this.oznaka = oznaka;
    }
    public SalaDto(){}

    public static SalaDto build(Sala sala){
        return new SalaDto(
                sala.getId(),
                sala.getKapacitet(),
                sala.getOznaka());
    }
}
