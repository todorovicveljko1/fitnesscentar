package com.fitnesscentar.services;

import com.fitnesscentar.entities.Korisnik;
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

    public List<Korisnik> getAllNeAktivne(){
        return korisnikRepository.findAllByAktivanFalse();
    }

    public Korisnik aktiviraj(Long id) throws EntityNotFoundException {
        Korisnik k = korisnikServis.getOne(id);
        k.setAktivan(true);
        korisnikRepository.save(k);
        return k;
    }
}
