package com.fitnesscentar.entities;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Set;

@Entity
public class Trening implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private String naziv;
    @Column
    private String opis;
    @Column
    private String tipTreninga;
    @Column
    private int trajanje;
    @Column
    private Timestamp vremePocetak;
    @Column
    private double cena;

    @ManyToOne(fetch = FetchType.LAZY)
    private Korisnik trener;
    @ManyToMany(mappedBy = "treninzi")
    private Set<Sala> sale;
    @OneToMany(mappedBy = "trening", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<KorisnikTrening> ucesnici;

    public Timestamp getVremePocetak() {
        return vremePocetak;
    }

    public void setVremePocetak(Timestamp vremePocetak) {
        this.vremePocetak = vremePocetak;
    }

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

    public void setTrajanje(int trajanje) {
        this.trajanje = trajanje;
    }

    public double getCena() {
        return cena;
    }

    public void setCena(double cena) {
        this.cena = cena;
    }
}
