package com.fitnesscentar.controllers;


import com.fitnesscentar.entities.FitnessCentar;
import com.fitnesscentar.entities.Korisnik;
import com.fitnesscentar.entities.dto.FitnessCentarDto;
import com.fitnesscentar.entities.dto.KorisnikDto;
import com.fitnesscentar.services.FitnessCentarService;
import com.fitnesscentar.services.KorisnikServis;
import com.fitnesscentar.services.TrenerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @Autowired
    public TrenerController(TrenerService trenerService) {
        this.trenerService = trenerService;
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
}
