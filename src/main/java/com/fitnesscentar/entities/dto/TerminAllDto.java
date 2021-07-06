package com.fitnesscentar.entities.dto;

import com.fitnesscentar.entities.Termin;

import java.util.Date;

public class TerminAllDto {
    private long id;

    private double cena;
    private Date vremePocetka;
    private int brojPrijavljenih;
    private String treningNaziv;
    private String treningOpis;
    private String treningTipTreninga;
    private int treningTrajanje;
    private String trenerKorisnickoIme;
    private String trenerIme;
    private String trenerPrezime;
    private String trenerTelefon;
    private String trenerEmail;
    private String salaOznaka;
    private int salaKapacitet;
    private String FCnaziv;
    private String FCadresa;

    public TerminAllDto(
            long id,
            double cena,
            Date vremePocetka,
            int brojPrijavljenih,
            String naziv,
            String opis,
            String tipTreninga,
            int trajanje,
            String salaOznaka,
            int salaKapacitet,
            String korisnickoIme,
            String ime,
            String prezime,
            String telefon,
            String email,
            String fcnaziv,
            String fcadresa
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
        this.trenerKorisnickoIme = korisnickoIme;
        this.trenerIme = ime;
        this.trenerPrezime = prezime;
        this.trenerTelefon = telefon;
        this.trenerEmail = email;
        this.FCnaziv = fcnaziv;
        this.FCadresa = fcadresa;
    }
    public TerminAllDto(){}

    public static TerminAllDto build(Termin termin){
        return new TerminAllDto(
                termin.getId(),
                termin.getCena(),
                termin.getVremePocetak(),
                termin.getBrojPrijavljenih(),
                termin.getTrening().getNaziv(),
                termin.getTrening().getOpis(),
                termin.getTrening().getTipTreninga(),
                termin.getTrening().getTrajanje(),
                termin.getSala().getOznaka(),
                termin.getSala().getKapacitet(),
                termin.getTrening().getTrener().getKorisnickoIme(),
                termin.getTrening().getTrener().getIme(),
                termin.getTrening().getTrener().getPrezime(),
                termin.getTrening().getTrener().getTelefon(),
                termin.getTrening().getTrener().getEmail(),
                termin.getSala().getFitnessCentar().getNaziv(),
                termin.getSala().getFitnessCentar().getAdresa()
        );
    }

    public String getFCnaziv() {
        return FCnaziv;
    }

    public void setFCnaziv(String FCnaziv) {
        this.FCnaziv = FCnaziv;
    }

    public String getFCadresa() {
        return FCadresa;
    }

    public void setFCadresa(String FCadresa) {
        this.FCadresa = FCadresa;
    }

    public String getTrenerKorisnickoIme() {
        return trenerKorisnickoIme;
    }

    public void setTrenerKorisnickoIme(String trenerKorisnickoIme) {
        this.trenerKorisnickoIme = trenerKorisnickoIme;
    }

    public String getTrenerIme() {
        return trenerIme;
    }

    public void setTrenerIme(String trenerIme) {
        this.trenerIme = trenerIme;
    }

    public String getTrenerPrezime() {
        return trenerPrezime;
    }

    public void setTrenerPrezime(String trenerPrezime) {
        this.trenerPrezime = trenerPrezime;
    }

    public String getTrenerTelefon() {
        return trenerTelefon;
    }

    public void setTrenerTelefon(String trenerTelefon) {
        this.trenerTelefon = trenerTelefon;
    }

    public String getTrenerEmail() {
        return trenerEmail;
    }

    public void setTrenerEmail(String trenerEmail) {
        this.trenerEmail = trenerEmail;
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
