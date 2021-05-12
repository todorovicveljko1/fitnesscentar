package com.fitnesscentar.entities;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
public class FitnessCentar implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private String naziv;
    @Column
    private String adresa;
    @Column
    private String telefon;
    @Column
    private String email;

    // Lista sala
    @OneToMany(mappedBy = "fitnessCentar", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Sala> sale = new HashSet<>();
    // Lista trenera
    @OneToMany(mappedBy = "fitnessCentar", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Korisnik> treneri = new HashSet<>();


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
}
