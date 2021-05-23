package com.fitnesscentar.entities;

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

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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
