package com.fitnesscentar.services;

import com.fitnesscentar.entities.FitnessCentar;
import com.fitnesscentar.entities.Korisnik;
import com.fitnesscentar.entities.Uloga;
import com.fitnesscentar.entities.dto.KorisnikDto;
import com.fitnesscentar.entities.dto.KorisnikPrijavaDto;
import com.fitnesscentar.repositories.KorisnikRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.io.NotActiveException;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

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
        Korisnik k = korisnikRepository.findKorisnikByKorisnickoImeOrEmail(korisnik.getKorisnickoIme(),korisnik.getKorisnickoIme());

        if(k==null || !k.getLozinka().equals(korisnik.getLozika())){
            throw new EntityNotFoundException("Losa kombinacija parametara za prijavu");
        }else if(!k.isAktivan()){
            throw new NotActiveException("Korisnik nije aktivan");
        }
        return k;

    }
    public Korisnik korisnikSaKorisnickimImenom(String k1) throws UsernameNotFoundException{
        return korisnikRepository
                .findByKorisnickoIme(k1)
                .orElseThrow(() -> new UsernameNotFoundException("Korisnik sa korisničkim imenom nije pronadjen"));
    }
    public Korisnik korisnikSaTokenom(String token){
        return korisnikRepository.getOne(Long.valueOf(token));
    }


    public UserDetails getUserDetailsByUsername(String korisnickoIme){
        Korisnik k = korisnikRepository
                .findByKorisnickoIme(korisnickoIme).orElseThrow(
                        () -> new UsernameNotFoundException(
                                String.format("User: %s, not found", korisnickoIme)
                        )
                );

        Set<GrantedAuthority> authorities = new HashSet<GrantedAuthority>();
        authorities.add(new SimpleGrantedAuthority(k.getUloga().name()));

        return new org.springframework.security.core.userdetails.User(k.getKorisnickoIme(), k.getLozinka(), k.isAktivan(),
                true, true, true,authorities);

    }
    public Korisnik getOne(Long id) throws EntityNotFoundException {
        Optional<Korisnik> optionalKorisnik = korisnikRepository.findById(id);
        if(optionalKorisnik.isPresent())
            return optionalKorisnik.get();
        throw new EntityNotFoundException();
    }

    public Korisnik updateKorisnik(Long id, KorisnikDto korisnikDto) throws EntityNotFoundException {
        Korisnik k = this.getOne(id);
        k.fill(korisnikDto);
        return  k;
    }
}
