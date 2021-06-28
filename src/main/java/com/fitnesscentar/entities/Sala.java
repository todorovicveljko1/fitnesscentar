package com.fitnesscentar.entities;

import com.fitnesscentar.entities.dto.SalaDto;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Sala implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column
    private int kapacitet;
    @Column
    private String oznaka;

    @OneToMany(mappedBy = "sala", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Termin> termini = new HashSet<>();

    @ManyToOne(fetch = FetchType.EAGER)
    private FitnessCentar fitnessCentar;

    public Set<Termin> getTermini() {
        return termini;
    }

    public void setTermini(Set<Termin> termini) {
        this.termini = termini;
    }

    public FitnessCentar getFitnessCentar() {
        return fitnessCentar;
    }

    public void setFitnessCentar(FitnessCentar fitnessCentar) {
        this.fitnessCentar = fitnessCentar;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getKapacitet() {
        return kapacitet;
    }

    public void setKapacitet(int kapacitet) {
        this.kapacitet = kapacitet;
    }

    public String getOznaka() {
        return oznaka;
    }

    public void setOznaka(String oznaka) {
        this.oznaka = oznaka;
    }

    public Sala fill(SalaDto salaDto){
        this.setOznaka(salaDto.getOznaka());
        this.setKapacitet(salaDto.getKapacitet());
        return this;
    }
}
