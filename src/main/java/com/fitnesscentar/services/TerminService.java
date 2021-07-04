package com.fitnesscentar.services;

import com.fitnesscentar.entities.Korisnik;
import com.fitnesscentar.entities.Termin;
import com.fitnesscentar.repositories.KorisnikRepository;
import com.fitnesscentar.repositories.TerminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;

@Service
public class TerminService {

    private final TerminRepository terminRepository;
    private final KorisnikRepository korisnikRepository;
    @Autowired
    public TerminService(TerminRepository terminRepository,  KorisnikRepository korisnikRepository){
        this.terminRepository = terminRepository;
        this.korisnikRepository = korisnikRepository;
    }

    public Termin getOne(Long id) throws EntityNotFoundException {
        Optional<Termin> termin = this.terminRepository.findById(id);
        if(termin.isPresent())
            return termin.get();
        throw new EntityNotFoundException();
    }

    public boolean daLiImaMesta(Long id) throws EntityNotFoundException{
        Termin termin = this.getOne(id);
        return termin.getBrojPrijavljenih() < termin.getSala().getKapacitet();
    }

    public void prijaviSe(Long id, Korisnik korisnik){
        Termin termin = this.getOne(id);
        termin.getPrijavljeniClanovi().add(korisnik);
        korisnik.getPrijavljeniTermini().add(termin);
        termin.setBrojPrijavljenih(termin.getBrojPrijavljenih()+1);
        this.terminRepository.save(termin);
        this.korisnikRepository.save(korisnik);
    }
}
