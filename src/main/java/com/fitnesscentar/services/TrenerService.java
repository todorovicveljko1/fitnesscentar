package com.fitnesscentar.services;

import com.fitnesscentar.entities.Korisnik;
import com.fitnesscentar.entities.Uloga;
import com.fitnesscentar.entities.dto.KorisnikDto;
import com.fitnesscentar.repositories.KorisnikRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class TrenerService {
    private final KorisnikRepository korisnikRepository;
    private final KorisnikServis korisnikServis;
    @Autowired
    public TrenerService(KorisnikRepository korisnikRepository, KorisnikServis korisnikServis){
        this.korisnikRepository = korisnikRepository;
        this.korisnikServis = korisnikServis;
    }
    public Korisnik getOne(Long id) throws EntityNotFoundException{
        return this.korisnikServis.getOne(id);
    }
    public List<Korisnik> getAllNeAktivne(){
        return korisnikRepository.findAllByAktivanFalse();
    }

    public List<Korisnik> getAll(){
        return korisnikRepository.findByUlogaIs(Uloga.TRENER);
    }

    public Korisnik aktiviraj(Long id) throws EntityNotFoundException {
        Korisnik k = korisnikServis.getOne(id);
        k.setAktivan(true);
        korisnikRepository.save(k);
        return k;
    }

    public void deleteById(Long id) {
        if(this.korisnikRepository.existsById(id)){
            this.korisnikRepository.deleteById(id);
        }
    }

    public Korisnik crate(KorisnikDto trener) {
        Korisnik k = new Korisnik();
        trener.setAktivan(true);
        trener.setUloga(Uloga.TRENER);
        k.fill(trener);
        return korisnikRepository.save(k);
    }

    public void save(Korisnik trener) {
        this.korisnikRepository.save(trener);
    }
}
