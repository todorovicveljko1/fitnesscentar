package com.fitnesscentar.repositories;

import com.fitnesscentar.entities.KorisnikTermin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface KorisnikTerminRepository extends JpaRepository<KorisnikTermin, Long> {
    Optional<KorisnikTermin> findByIdEqualsAndClan_Id(Long id, Long clan_Id);
}
