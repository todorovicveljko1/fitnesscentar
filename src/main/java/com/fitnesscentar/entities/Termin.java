package com.fitnesscentar.entities;

import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Termin implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column
    private Date vremePocetak;
    @Column
    private double cena;

    //@Formula("SELECT COUNT(*) FROM termin t, prijavljeni p WHERE t.id = p.termin_id")
    @Column
    private int brojPrijavljenih;

    @ManyToOne(fetch = FetchType.EAGER)
    private Sala sala;
    @ManyToOne(fetch = FetchType.EAGER)
    private Trening trening;
    @OneToMany(mappedBy = "termin", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<KorisnikTermin> clanovi = new HashSet<>();
    @ManyToMany(mappedBy = "prijavljeniTermini")
    private Set<Korisnik> prijavljeniClanovi = new HashSet<>();

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

    public Sala getSala() {
        return sala;
    }

    public void setSala(Sala sala) {
        this.sala = sala;
    }

    public Trening getTrening() {
        return trening;
    }

    public void setTrening(Trening trening) {
        this.trening = trening;
    }

    public Set<KorisnikTermin> getClanovi() {
        return clanovi;
    }

    public void setClanovi(Set<KorisnikTermin> clanovi) {
        this.clanovi = clanovi;
    }

    public Set<Korisnik> getPrijavljeniClanovi() {
        return prijavljeniClanovi;
    }

    public void setPrijavljeniClanovi(Set<Korisnik> prijavljeniClanovi) {
        this.prijavljeniClanovi = prijavljeniClanovi;
    }
}
