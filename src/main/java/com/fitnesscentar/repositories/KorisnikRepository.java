package com.fitnesscentar.repositories;

import com.fitnesscentar.entities.Korisnik;
import com.fitnesscentar.entities.Uloga;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;
import java.util.Optional;

public interface KorisnikRepository extends JpaRepository<Korisnik, Long> {
    Korisnik findKorisnikByKorisnickoImeOrEmail(String k1, String k2);
    Optional<Korisnik> findByKorisnickoIme(String k1) throws UsernameNotFoundException;
    List<Korisnik> findAllByAktivanFalse();
    List<Korisnik> findByUlogaIs(Uloga uloga);
    boolean existsByKorisnickoIme(String k);
    boolean existsByEmail(String k);
}
