package com.fitnesscentar.entities;

import com.fitnesscentar.entities.dto.TreningDto;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.HashSet;
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

    @ManyToOne(fetch = FetchType.EAGER)
    private Korisnik trener;

    @OneToMany(mappedBy = "trening", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Termin> termini = new HashSet<>();

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

    public void fill(TreningDto treningDto){
        this.setNaziv(treningDto.getNaziv());
        this.setOpis(treningDto.getOpis());
        this.setTipTreninga(treningDto.getTipTreninga());
        this.setTrajanje(treningDto.getTrajanje());
    }
}
