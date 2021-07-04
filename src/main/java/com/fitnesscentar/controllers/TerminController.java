package com.fitnesscentar.controllers;

import com.fitnesscentar.entities.Korisnik;
import com.fitnesscentar.entities.dto.SalaDto;
import com.fitnesscentar.entities.dto.TerminPrijavaDto;
import com.fitnesscentar.entities.dto.TreningDto;
import com.fitnesscentar.services.KorisnikServis;
import com.fitnesscentar.services.TerminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.EntityNotFoundException;
import java.security.Principal;

@RestController
@RequestMapping(value = "/api/termin")
public class TerminController {

    private final TerminService terminService;
    private final KorisnikServis korisnikServis;
    @Autowired
    public TerminController(TerminService terminService, KorisnikServis korisnikServis){
        this.terminService = terminService;
        this.korisnikServis = korisnikServis;
    }

    @PostMapping(value="/{id}/prijave")
    @PreAuthorize("hasAuthority('CLAN')")
    public ResponseEntity<Boolean> prijava(@PathVariable Long id) throws ResponseStatusException{
        if(this.terminService.daLiImaMesta(id)){
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            this.terminService.prijaviSe(id, korisnikServis.korisnikSaKorisnickimImenom(authentication.getName()));
            return new ResponseEntity<>(true, HttpStatus.CREATED);
        }else{
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Za izabrani termin nema slobodnih mesta");
        }
    }

    @GetMapping(value="/{id}/sala")
    public ResponseEntity<SalaDto> getSala(@PathVariable Long id) throws ResponseStatusException{
        try{
            return new ResponseEntity<>(SalaDto.build(this.terminService.getOne(id).getSala()), HttpStatus.OK);
        }catch(EntityNotFoundException e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Termin nije pronadjen");
        }

    }

    @GetMapping(value="/{id}/trening")
    public ResponseEntity<TreningDto> getTrening(@PathVariable Long id) throws ResponseStatusException{
        try{
            return new ResponseEntity<>(TreningDto.build(this.terminService.getOne(id).getTrening()), HttpStatus.OK);
        }catch(EntityNotFoundException e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Termin nije pronadjen");
        }

    }
}
