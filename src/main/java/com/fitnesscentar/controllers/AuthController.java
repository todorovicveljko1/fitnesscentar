package com.fitnesscentar.controllers;

import com.fitnesscentar.entities.dto.KorisnikDto;
import com.fitnesscentar.entities.dto.KorisnikPrijavaDto;
import com.fitnesscentar.services.KorisnikServis;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.EntityNotFoundException;
import java.io.NotActiveException;

@CrossOrigin
@RestController
@RequestMapping(value = "/api")
public class AuthController {

    private final KorisnikServis korisnikServis;

    @Autowired
    public AuthController(KorisnikServis korisnikServis){
        this.korisnikServis = korisnikServis;
    }

    @PostMapping(value = "/register")
    public ResponseEntity<KorisnikDto> registracija(@RequestBody KorisnikDto noviKorisnik){
        return new ResponseEntity<>(KorisnikDto.build(korisnikServis.registruj(noviKorisnik)), HttpStatus.CREATED);
    }

    @PostMapping(value = "/prijava")
    public ResponseEntity<KorisnikDto> prijavise(@RequestBody KorisnikPrijavaDto noviKorisnik) throws ResponseStatusException{
        try{
            return new ResponseEntity<>(KorisnikDto.build(korisnikServis.prijava(noviKorisnik)), HttpStatus.OK);
        }catch (EntityNotFoundException exc){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, exc.getMessage(), exc);

        }catch (NotActiveException exc){
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, exc.getMessage(), exc);
        }
    }

}
