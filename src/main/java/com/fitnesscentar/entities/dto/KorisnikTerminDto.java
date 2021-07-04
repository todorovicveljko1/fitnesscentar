package com.fitnesscentar.entities.dto;

import com.fitnesscentar.entities.KorisnikTermin;

public class KorisnikTerminDto {
    private long id;
    private int ocena;
    private TerminDto termin;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getOcena() {
        return ocena;
    }

    public void setOcena(int ocena) {
        this.ocena = ocena;
    }

    public TerminDto getTermin() {
        return termin;
    }

    public void setTermin(TerminDto termin) {
        this.termin = termin;
    }
    public KorisnikTerminDto(){}
    public KorisnikTerminDto(long id, int ocena, TerminDto termin) {
        this.id = id;
        this.ocena = ocena;
        this.termin = termin;
    }

    public static KorisnikTerminDto build(KorisnikTermin kt){
        return new KorisnikTerminDto(
                kt.getId(),
                kt.getOcena(),
                TerminDto.build(kt.getTermin())
        );
    }
}
