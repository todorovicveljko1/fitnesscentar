package com.fitnesscentar.entities;

import javax.persistence.*;
import java.util.Set;

@Entity
public class KorisnikTrening {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private int ocena;

    @ManyToOne(fetch = FetchType.LAZY)
    private Korisnik clan;

    @ManyToOne(fetch = FetchType.LAZY)
    private Trening trening;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getOcena() {
        return ocena;
    }

    public void setOcena(int ocena) {
        this.ocena = ocena;
    }
}
