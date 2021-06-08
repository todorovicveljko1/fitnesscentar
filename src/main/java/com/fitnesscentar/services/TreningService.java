package com.fitnesscentar.services;

import com.fitnesscentar.entities.FitnessCentar;
import com.fitnesscentar.entities.Sala;
import com.fitnesscentar.entities.Termin;
import com.fitnesscentar.entities.Trening;
import com.fitnesscentar.entities.dto.FitnessCentarDto;
import com.fitnesscentar.entities.dto.TreningDto;
import com.fitnesscentar.repositories.FitnessCentarRepository;
import com.fitnesscentar.repositories.TreningRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.EntityNotFoundException;
import javax.persistence.criteria.*;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class TreningService {
    private final TreningRepository treningRepository;
    private final EntityManager em;
    @Autowired
    public TreningService(TreningRepository treningRepository,EntityManager em){
        this.treningRepository = treningRepository;
        this.em = em;
    }

    public Trening getOne(Long id) throws EntityNotFoundException {
        Optional<Trening> optionalTrening = treningRepository.findById(id);
        if(optionalTrening.isPresent())
            return optionalTrening.get();
        throw new EntityNotFoundException();
    }

    public List<Trening> getAll() {
        return treningRepository.findAll();
    }

    public Trening create(TreningDto treningDto) {
        Trening trening = new Trening();
        trening.fill(treningDto);
        return treningRepository.save(trening);
    }

    public Trening update(Long id, TreningDto treningDto) throws EntityNotFoundException{
        Trening trening = this.getOne(id);
        trening.fill(treningDto);
        return treningRepository.save(trening);
    }

    public void deleteById(Long id){
        if(treningRepository.existsById(id)){
            treningRepository.deleteById(id);
        }
    }

    public List<Trening> search(String naziv, String opis, String tip, double cena,Date vremePocetka, String orderBy, String direction){

        System.out.println(vremePocetka);
        return treningRepository.findAll();//ByNazivContainingAndOpisContainingAndTerminiCenaLessThanEqualTerminiVremePocetkaGreaterThanEqual(naziv, opis, cena, vremePocetka);
        /*CriteriaBuilder builder = em.getCriteriaBuilder();
        CriteriaQuery<Trening> query = builder.createQuery(Trening.class);

        Root<Trening> root= query.from(Trening.class);

        Predicate byNaziv = builder.like(root.get("naziv"), "%"+naziv+"%");
        Predicate byOpis = builder.like(root.get("opis"), "%"+opis+"%");
        Predicate byTip = builder.like(root.get("tipTreninga"), "%"+tip+"%");

        Join<Trening, Termin> termini = root.join("termini");
        System.out.println(cena);
        if(cena > 0) {
            Predicate byCena = builder.lessThanOrEqualTo(termini.get("cena"), cena);
            query.where(byCena);
        }
        if(!vremePocetka.equals("")){
            Predicate byDatum = builder.lessThanOrEqualTo(termini.get("vremePocetak"),new Date(vremePocetka));
            query.where(byDatum);
        }
        query.where(builder.and(byNaziv, byOpis, byTip));
        if(direction == "asc") {
            Order order = builder.asc(termini.get(orderBy));
            query.orderBy(order);
        }else if(direction == "desc"){
            Order order = builder.desc(termini.get(orderBy));
            query.orderBy(order);
        }
        query.distinct(true);
        return em.createQuery(query.select(root)).getResultList();*/
    }

}
