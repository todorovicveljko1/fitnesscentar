package com.fitnesscentar.controllers;

import com.fitnesscentar.entities.Korisnik;
import com.fitnesscentar.entities.dto.TerminPrijavaDto;
import com.fitnesscentar.services.KorisnikServis;
import com.fitnesscentar.services.TerminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

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
}
