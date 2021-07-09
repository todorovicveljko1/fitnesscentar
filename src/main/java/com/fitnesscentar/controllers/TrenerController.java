package com.fitnesscentar.controllers;


import com.fitnesscentar.entities.FitnessCentar;
import com.fitnesscentar.entities.Korisnik;
import com.fitnesscentar.entities.dto.FitnessCentarDto;
import com.fitnesscentar.entities.dto.KorisnikDto;
import com.fitnesscentar.entities.dto.SalaDto;
import com.fitnesscentar.entities.dto.TreningDto;
import com.fitnesscentar.services.FitnessCentarService;
import com.fitnesscentar.services.KorisnikServis;
import com.fitnesscentar.services.TrenerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value="api/treneri")
public class TrenerController {

    private final TrenerService trenerService;
    private final PasswordEncoder passwordEncoder;
    private final FitnessCentarService fitnessCentarService;
    private final KorisnikServis korisnikServis;

    @Autowired
    public TrenerController(KorisnikServis korisnikServis, FitnessCentarService fitnessCentarService, TrenerService trenerService, PasswordEncoder passwordEncoder) {
        this.trenerService = trenerService;
        this.passwordEncoder = passwordEncoder;
        this.fitnessCentarService = fitnessCentarService;
        this.korisnikServis = korisnikServis;
    }

    @GetMapping
    public ResponseEntity<List<KorisnikDto>> getAll(){
        return new ResponseEntity<>(trenerService
                .getAll()
                .stream()
                .map(t->new KorisnikDto().build(t))
                .collect(Collectors.toList()), HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<KorisnikDto> create(@RequestBody KorisnikDto trener){
        trener.setLozinka(passwordEncoder.encode(trener.getLozinka()));
        return new ResponseEntity<>(new KorisnikDto().build(this.trenerService.crate(trener)), HttpStatus.CREATED);
    }
    @DeleteMapping(value = "/{id}")
    public HttpStatus deleteTrener(@PathVariable Long id){
        trenerService.deleteById(id);
        return HttpStatus.NO_CONTENT;
    }

    @GetMapping(value="/neaktivni")
    public ResponseEntity<List<KorisnikDto>> getAllTrener(){
        List<KorisnikDto> korisnikDtos = new ArrayList<>();
        for(Korisnik trener: trenerService.getAllNeAktivne()){
            korisnikDtos.add(KorisnikDto.build(trener));
        }
        return new ResponseEntity<>(korisnikDtos, HttpStatus.OK);
    }

    @PutMapping(value="/{id}/aktiviraj")
    public ResponseEntity<KorisnikDto> aktivirajTrener(@PathVariable Long id){
        try{
            return new ResponseEntity<>(KorisnikDto.build(trenerService.aktiviraj(id)), HttpStatus.OK);
        }catch (EntityNotFoundException exc){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Trener(ID: %d) nije pronadjen", id), exc);
        }
    }

    @GetMapping(value="/{id}/fitnesscentar")
    public ResponseEntity<Boolean> getMyFC(@PathVariable Long id) throws ResponseStatusException{
        try{
            FitnessCentar fc = this.trenerService.getOne(id).getFitnessCentar();
            if(fc == null) return new ResponseEntity<>(false, HttpStatus.OK);
            return new ResponseEntity<>(true, HttpStatus.OK);
        }catch(EntityNotFoundException e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Trener nije pronadjen");
        }

    }

    @GetMapping(value="/{id}/fitnesscentar/{idf}")
    public ResponseEntity<FitnessCentarDto> getSala(@PathVariable Long id, @PathVariable Long idf) throws ResponseStatusException{
        try{
            FitnessCentar fc = this.fitnessCentarService.getOne(idf);
            Korisnik trener = this.trenerService.getOne(id);
            trener.setFitnessCentar(fc);
            trenerService.save(trener);
            return new ResponseEntity<>(FitnessCentarDto.build(trener.getFitnessCentar()), HttpStatus.OK);
        }catch(EntityNotFoundException e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Trener nije pronadjen");
        }

    }

    @GetMapping(value="/sale")
    public ResponseEntity<List<SalaDto>> getSale(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Korisnik korisnik = korisnikServis.korisnikSaKorisnickimImenom(authentication.getName());
        return new ResponseEntity<>(korisnik.getFitnessCentar()
                .getSale()
                .stream()
                .map(t-> SalaDto.build(t))
                .collect(Collectors.toList()), HttpStatus.OK);
    }

    @GetMapping(value="/treninzi")
    public ResponseEntity<List<TreningDto>> getTrenerTreninzi(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Korisnik korisnik = korisnikServis.korisnikSaKorisnickimImenom(authentication.getName());
        return new ResponseEntity<>(this.trenerService
                .getTrenerTreninzi(korisnik)
                .stream()
                .map(t-> TreningDto.build(t))
                .collect(Collectors.toList()), HttpStatus.OK);
    }

    @PostMapping(value="/treninzi")
    public ResponseEntity<TreningDto> postTrenerTreninzi(@RequestBody TreningDto treningDto){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Korisnik korisnik = korisnikServis.korisnikSaKorisnickimImenom(authentication.getName());
        return new ResponseEntity<>(TreningDto.build(this.trenerService.addTrening(korisnik,treningDto)),HttpStatus.OK);
    }
}
