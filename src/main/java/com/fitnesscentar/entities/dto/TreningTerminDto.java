package com.fitnesscentar.entities.dto;


import com.fitnesscentar.entities.Trening;

import java.util.List;
import java.util.stream.Collectors;

public class TreningTerminDto {
    private long id;

    private String naziv;
    private String opis;
    private String tipTreninga;
    private int trajanje;
    private List<TerminDto> termini;
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

    public TreningTerminDto(long id, String naziv, String opis, String tipTreninga, int trajanje, List<TerminDto> termini) {
        this.id = id;
        this.naziv = naziv;
        this.opis = opis;
        this.tipTreninga = tipTreninga;
        this.trajanje = trajanje;
        this.termini = termini;
    }
    public TreningTerminDto(){}

    public void setTrajanje(int trajanje) {
        this.trajanje = trajanje;
    }

    public List<TerminDto> getTermini() {
        return termini;
    }

    public void setTermini(List<TerminDto> termini) {
        this.termini = termini;
    }

    public static TreningTerminDto build(Trening trening){

        return new TreningTerminDto(
                trening.getId(),
                trening.getNaziv(),
                trening.getOpis(),
                trening.getTipTreninga(),
                trening.getTrajanje(),
                trening.getTermini().stream().map(t -> TerminDto.build(t)).collect(Collectors.toList())
        );
    }
}
