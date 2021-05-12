package com.fitnesscentar.entities;

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

    @ManyToOne(fetch = FetchType.EAGER)
    private Sala sala;
    @ManyToOne(fetch = FetchType.EAGER)
    private Trening trening;
    @OneToMany(mappedBy = "termin", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<KorisnikTermin> clanovi = new HashSet<>();

}
