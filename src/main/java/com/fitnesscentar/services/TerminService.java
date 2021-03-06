package com.fitnesscentar.services;

import com.fitnesscentar.entities.Korisnik;
import com.fitnesscentar.entities.Sala;
import com.fitnesscentar.entities.Termin;
import com.fitnesscentar.entities.Trening;
import com.fitnesscentar.entities.dto.TerminBodyDto;
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
    private final SalaService salaService;
    @Autowired
    public TerminService(SalaService salaService, TerminRepository terminRepository,  KorisnikRepository korisnikRepository){
        this.terminRepository = terminRepository;
        this.korisnikRepository = korisnikRepository;
        this.salaService = salaService;
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

    public void prijaviSe(Long id, Korisnik korisnik) throws EntityNotFoundException{
        Termin termin = this.getOne(id);
        korisnik.getPrijavljeniTermini().add(termin);
        termin.setBrojPrijavljenih(termin.getBrojPrijavljenih()+1);
        this.terminRepository.save(termin);
        this.korisnikRepository.save(korisnik);
    }

    public void odjaviSe(Long id, Korisnik korisnik) throws EntityNotFoundException {
        Termin termin = this.getOne(id);
        korisnik.getPrijavljeniTermini().remove(termin);
        termin.setBrojPrijavljenih(termin.getBrojPrijavljenih()-1);
        this.terminRepository.save(termin);
        this.korisnikRepository.save(korisnik);
    }

    public Termin update(Termin termin, TerminBodyDto terminBodyDto) {
        termin.setCena(terminBodyDto.getCena());
        termin.setVremePocetak(terminBodyDto.getVremePocetak());
        Sala s = this.salaService.getOne(terminBodyDto.getSala());
        termin.setSala(s);
        return terminRepository.save(termin);
    }
}
