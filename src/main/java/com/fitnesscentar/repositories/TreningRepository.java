package com.fitnesscentar.repositories;

import com.fitnesscentar.entities.Trening;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.persistence.EntityManager;
import java.util.Date;
import java.util.List;

public interface TreningRepository extends JpaRepository<Trening, Long> {


    @EntityGraph(
            type = EntityGraph.EntityGraphType.FETCH,
            attributePaths = {
                    "termini",
                    "termini.sala"
            }
    )
    public List<Trening> findAll();
    //public List<Trening> findAllByNazivContainingAndOpisContainingAndTerminiCenaLessThanEqualTerminiVremePocetkaGreaterThanEqual(String naziv, String pis, Double Cena, Date vremePocetka);
}
