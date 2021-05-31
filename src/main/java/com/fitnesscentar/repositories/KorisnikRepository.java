package com.fitnesscentar.repositories;

import com.fitnesscentar.entities.Korisnik;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface KorisnikRepository extends JpaRepository<Korisnik, Long> {
    Korisnik findKorisnikByKorisnickoImeOrEmail(String k1, String k2);
}
