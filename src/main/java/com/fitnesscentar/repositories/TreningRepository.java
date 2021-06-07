package com.fitnesscentar.repositories;

import com.fitnesscentar.entities.Trening;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TreningRepository extends JpaRepository<Trening, Long> {
}
