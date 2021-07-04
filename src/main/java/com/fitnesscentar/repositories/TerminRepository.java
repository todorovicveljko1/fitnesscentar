package com.fitnesscentar.repositories;

import com.fitnesscentar.entities.Termin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TerminRepository extends JpaRepository<Termin, Long> {
}
