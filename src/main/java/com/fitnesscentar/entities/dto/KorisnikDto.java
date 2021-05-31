package com.fitnesscentar.entities.dto;

import com.fitnesscentar.entities.Korisnik;
import com.fitnesscentar.entities.Uloga;

import javax.persistence.*;
import java.sql.Date;

public class KorisnikDto {

    private long id;

    private String korisnickoIme;
    private String lozinka;
    private String ime;
    private String prezime;
    private String telefon;
    private String email;
    private Date datumRodjenja;
    private Uloga uloga;
    private boolean aktivan;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getKorisnickoIme() {
        return korisnickoIme;
    }

    public void setKorisnickoIme(String korisnickoIme) {
        this.korisnickoIme = korisnickoIme;
    }

    public String getLozinka() {
        return lozinka;
    }

    public void setLozinka(String lozinka) {
        this.lozinka = lozinka;
    }

    public String getIme() {
        return ime;
    }

    public void setIme(String ime) {
        this.ime = ime;
    }

    public String getPrezime() {
        return prezime;
    }

    public void setPrezime(String prezime) {
        this.prezime = prezime;
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

    public Date getDatumRodjenja() {
        return datumRodjenja;
    }

    public void setDatumRodjenja(Date datumRodjenja) {
        this.datumRodjenja = datumRodjenja;
    }

    public Uloga getUloga() {
        return uloga;
    }

    public void setUloga(Uloga uloga) {
        this.uloga = uloga;
    }

    public boolean isAktivan() {
        return aktivan;
    }

    public void setAktivan(boolean aktivan) {
        this.aktivan = aktivan;
    }
    public KorisnikDto(long id, String korisnickoIme, String lozinka, String ime, String prezime, String telefon, String email, Date datumRodjenja, Uloga uloga, boolean aktivan) {
        this.id = id;
        this.korisnickoIme = korisnickoIme;
        this.lozinka = lozinka;
        this.ime = ime;
        this.prezime = prezime;
        this.telefon = telefon;
        this.email = email;
        this.datumRodjenja = datumRodjenja;
        this.uloga = uloga;
        this.aktivan = aktivan;
    }

    public KorisnikDto() {
    }

    public static KorisnikDto build(Korisnik korisnik){
        return new KorisnikDto(
                korisnik.getId(),
                korisnik.getKorisnickoIme(),
                korisnik.getLozinka(),
                korisnik.getIme(),
                korisnik.getPrezime(),
                korisnik.getTelefon(),
                korisnik.getEmail(),
                korisnik.getDatumRodjenja(),
                korisnik.getUloga(),
                korisnik.isAktivan()
        );
    }
}
