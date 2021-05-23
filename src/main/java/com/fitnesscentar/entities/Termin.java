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

    @Formula("SELECT COUNT(*) FROM termin t, prijavljeni p WHERE t.id = p.termin_id")
    private int brojPrijavljenih;

    @ManyToOne(fetch = FetchType.EAGER)
    private Sala sala;
    @ManyToOne(fetch = FetchType.EAGER)
    private Trening trening;
    @OneToMany(mappedBy = "termin", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<KorisnikTermin> clanovi = new HashSet<>();
    @ManyToMany(mappedBy = "prijavljeniTermini")
    private Set<Korisnik> prijavljeniClanovi = new HashSet<>();

}
