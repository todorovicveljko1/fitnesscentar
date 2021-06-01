package com.fitnesscentar.services;

import com.fitnesscentar.entities.Korisnik;
import com.fitnesscentar.entities.Uloga;
import com.fitnesscentar.entities.dto.KorisnikDto;
import com.fitnesscentar.entities.dto.KorisnikPrijavaDto;
import com.fitnesscentar.repositories.KorisnikRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.io.NotActiveException;

@Service
public class KorisnikServis {
    private final KorisnikRepository korisnikRepository;

    @Autowired
    public KorisnikServis(KorisnikRepository korisnikRepository){
        this.korisnikRepository = korisnikRepository;
    }

    public Korisnik registruj(KorisnikDto noviKorisnik){
        if(noviKorisnik.getUloga() == Uloga.CLAN){
            noviKorisnik.setAktivan(true);
        }else if(noviKorisnik.getUloga() == Uloga.TRENER){
            noviKorisnik.setAktivan(false);
        }
        Korisnik korisnik = new Korisnik();
        korisnik.fill(noviKorisnik);
        korisnikRepository.save(korisnik);
        return korisnik;
    }

    public Korisnik prijava(KorisnikPrijavaDto korisnik) throws EntityNotFoundException, NotActiveException{
        Korisnik k = korisnikRepository.findKorisnikByKorisnickoImeOrEmail(korisnik.getKorisnickoImeIliEmail(),korisnik.getKorisnickoImeIliEmail());

        if(k==null || !k.getLozinka().equals(korisnik.getLozika())){
            throw new EntityNotFoundException("Losa kombinacija parametara za prijavu");
        }else if(!k.isAktivan()){
            throw new NotActiveException("Korisnik nije aktivan");
        }
        return k;

    }

    public Korisnik korisnikSaTokenom(String token){
        return korisnikRepository.getOne(Long.valueOf(token));
    }
}
