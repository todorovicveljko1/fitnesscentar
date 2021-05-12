package com.fitnesscentar.entities;

import javax.persistence.*;
import java.util.Set;

@Entity
public class KorisnikTermin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column
    private int ocena;

    // Koji clan ide
    @ManyToOne(fetch = FetchType.EAGER)
    private Korisnik clan;
    // Na termin
    @ManyToOne(fetch = FetchType.EAGER)
    private Termin termin;

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
