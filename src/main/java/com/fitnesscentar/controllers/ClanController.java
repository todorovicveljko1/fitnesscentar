package com.fitnesscentar.controllers;


import com.fitnesscentar.entities.Korisnik;
import com.fitnesscentar.entities.Termin;
import com.fitnesscentar.entities.dto.TerminDto;
import com.fitnesscentar.services.KorisnikServis;
import com.fitnesscentar.services.TerminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/api/clan")
public class ClanController {
    private final TerminService terminService;
    private final KorisnikServis korisnikServis;
    @Autowired
    public ClanController(TerminService terminService, KorisnikServis korisnikServis){
        this.terminService = terminService;
        this.korisnikServis = korisnikServis;
    }

    @GetMapping(value = "/prijave")
    @PreAuthorize("hasAuthority('CLAN')")
    public ResponseEntity<List<TerminDto>> getPrijave(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Korisnik korisnik = korisnikServis.korisnikSaKorisnickimImenom(authentication.getName());
        return new ResponseEntity<>(
            korisnik.getPrijavljeniTermini()
                    .stream()
                    .map(t -> TerminDto.build(t))
                    .collect(Collectors.toList()), HttpStatus.OK);
    }

    @DeleteMapping(value = "/prijave/{id}")
    @PreAuthorize("hasAuthority('CLAN')")
    public HttpStatus deletePrijave(@PathVariable Long id) throws EntityNotFoundException {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            Korisnik korisnik = korisnikServis.korisnikSaKorisnickimImenom(authentication.getName());
            korisnik.getPrijavljeniTermini().remove(terminService.getOne(id));
            korisnikServis.save(korisnik);
            return HttpStatus.NO_CONTENT;
        }catch (EntityNotFoundException e){
            return HttpStatus.NOT_FOUND;
        }
    }



}
