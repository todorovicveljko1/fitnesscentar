package com.fitnesscentar.entities;

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
}
