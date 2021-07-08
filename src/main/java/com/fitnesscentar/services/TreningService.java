package com.fitnesscentar.services;

import com.fitnesscentar.entities.*;
import com.fitnesscentar.entities.dto.FitnessCentarDto;
import com.fitnesscentar.entities.dto.TerminBodyDto;
import com.fitnesscentar.entities.dto.TreningDto;
import com.fitnesscentar.repositories.FitnessCentarRepository;
import com.fitnesscentar.repositories.TerminRepository;
import com.fitnesscentar.repositories.TreningRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityGraph;
import javax.persistence.EntityManager;
import javax.persistence.EntityNotFoundException;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class TreningService {
    private final TreningRepository treningRepository;
    private final TerminRepository terminRepository;
    private final SalaService salaService;
    private final EntityManager em;
    @Autowired
    public TreningService(TerminRepository terminRepository, SalaService salaService, TreningRepository treningRepository,EntityManager em){
        this.treningRepository = treningRepository;
        this.em = em;
        this.salaService = salaService;
        this.terminRepository= terminRepository;
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

    public List<Termin> search(String naziv, String opis, String tip, double cena,Date vremePocetka, String orderBy, String direction){

        EntityGraph entityGraph = em.createEntityGraph(Termin.class);
        CriteriaBuilder builder = em.getCriteriaBuilder();
        CriteriaQuery<Termin> query = builder.createQuery(Termin.class);

        Root<Termin> root= query.from(Termin.class);

        Join<Trening, Termin> trening = root.join("trening");
        //Join<Trening, Korisnik> trener = trening.join("trener");
        Join<Sala, Termin> sala = root.join("sala");
        //Join<Sala, FitnessCentar> fc = sala.join("fitnessCentar");


        Predicate byNaziv = builder.like(trening.get("naziv"), "%"+naziv+"%");
        Predicate byOpis = builder.like(trening.get("opis"), "%"+opis+"%");
        Predicate byTip = builder.like(trening.get("tipTreninga"), "%"+tip+"%");
        Predicate preWhere = builder.and(byNaziv, byOpis, byTip);

        if(cena!=0){
            Predicate byCenaLess = builder.lessThanOrEqualTo(root.get("cena"), cena);
            preWhere = builder.and(preWhere, byCenaLess);
        }
        if(vremePocetka != null){
            Predicate byDatum = builder.greaterThanOrEqualTo(root.get("vremePocetak"),vremePocetka);
            preWhere = builder.and(preWhere, byDatum);
        }

        query.where(preWhere);

        if(direction.equals("asc")) {
            query.orderBy(builder.asc(root.get(orderBy)));
        }else if(direction.equals("desc")){
            query.orderBy(builder.desc(root.get(orderBy)));
        }
        TypedQuery<Termin> terminQuery = em.createQuery(query);
        entityGraph.addAttributeNodes("trening");
        entityGraph.addAttributeNodes("sala");
        terminQuery.setHint("javax.persistence.fetchgraph", entityGraph);
        return terminQuery.getResultList();
    }

    public Termin addTermin(Long id, TerminBodyDto terminBodyDto) throws EntityNotFoundException{
        Trening trening = this.getOne(id);
        Termin termin = new Termin();
        termin.setBrojPrijavljenih(0);
        termin.setCena(terminBodyDto.getCena());
        termin.setVremePocetak(terminBodyDto.getVremePocetak());
        termin.setTrening(trening);
        Sala s = this.salaService.getOne(terminBodyDto.getSala());
        // Provera da li je sala slobodna
        termin.setSala(s);
        return terminRepository.save(termin);
    }
}
