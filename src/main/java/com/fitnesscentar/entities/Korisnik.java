package com.fitnesscentar.entities;

import com.fitnesscentar.entities.dto.KorisnikDto;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Korisnik implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;


    @Column(unique = true)
    private String korisnickoIme;
    @Column
    private String lozinka;
    @Column
    private String ime;
    @Column
    private String prezime;
    @Column
    private String telefon;
    @Column(unique = true)
    private String email;
    @Column
    private Date datumRodjenja;
    // Uloga korisnika u sistemu
    @Enumerated(EnumType.STRING)
    private Uloga uloga;
    @Column
    private boolean aktivan;

    // Gde trener radi
    @ManyToOne(fetch = FetchType.LAZY)
    private FitnessCentar fitnessCentar;

    // Set termina na koje korisnik ide
    @OneToMany(mappedBy = "clan", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<KorisnikTermin> terminiTreninga = new HashSet<>();

    // Set treninga koje trener drzi
    @OneToMany(mappedBy = "trener", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Trening> treninzi = new HashSet<>();
    @ManyToMany
    @JoinTable(name = "prijavljeni",
            joinColumns = @JoinColumn(name = "korisnik_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "termin_id", referencedColumnName = "id"))
    private Set<Termin> prijavljeniTermini = new HashSet<>();
    public void fill(KorisnikDto korisnik){
        //this.setId(korisnik.getId());
        this.setKorisnickoIme(korisnik.getKorisnickoIme());
        this.setLozinka(korisnik.getLozinka());
        this.setIme(korisnik.getIme());
        this.setPrezime(korisnik.getPrezime());
        this.setTelefon(korisnik.getTelefon());
        this.setEmail(korisnik.getEmail());
        this.setDatumRodjenja(korisnik.getDatumRodjenja());
        this.setUloga(korisnik.getUloga());
        this.setAktivan(korisnik.isAktivan());
    }
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

    public FitnessCentar getFitnessCentar() {
        return fitnessCentar;
    }

    public void setFitnessCentar(FitnessCentar fitnessCentar) {
        this.fitnessCentar = fitnessCentar;
    }

    public Set<KorisnikTermin> getTerminiTreninga() {
        return terminiTreninga;
    }

    public void setTerminiTreninga(Set<KorisnikTermin> terminiTreninga) {
        this.terminiTreninga = terminiTreninga;
    }

    public Set<Trening> getTreninzi() {
        return treninzi;
    }

    public void setTreninzi(Set<Trening> treninzi) {
        this.treninzi = treninzi;
    }

    public Set<Termin> getPrijavljeniTermini() {
        return prijavljeniTermini;
    }

    public void setPrijavljeniTermini(Set<Termin> prijavljeniTermini) {
        this.prijavljeniTermini = prijavljeniTermini;
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
}
