package com.fitnesscentar.entities.dto;

import com.fitnesscentar.entities.FitnessCentar;

public class FitnessCentarDto {
    private long id;

    private String naziv;
    private String adresa;
    private String telefon;
    private String email;

    public FitnessCentarDto(long id, String naziv, String adresa, String telefon, String email) {
        this.id = id;
        this.naziv = naziv;
        this.adresa = adresa;
        this.telefon = telefon;
        this.email = email;
    }
    public FitnessCentarDto(){}

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

    public String getAdresa() {
        return adresa;
    }

    public void setAdresa(String adresa) {
        this.adresa = adresa;
    }

    public String getTelefon() {
        return telefon;
    }

    public void setTelefon(String telefon) {
        this.telefon = telefon;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public static FitnessCentarDto build(FitnessCentar fc){
        return new FitnessCentarDto(
                fc.getId(),
                fc.getNaziv(),
                fc.getAdresa(),
                fc.getTelefon(),
                fc.getEmail()
        );
    }
}

