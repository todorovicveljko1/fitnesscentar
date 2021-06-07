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

@RestController
@RequestMapping(value="api/treneri")
public class TrenerController {

    private final TrenerService trenerService;
    private final KorisnikServis korisnikServis;

    @Autowired
    public TrenerController(TrenerService trenerService,  KorisnikServis korisnikServis) {
        this.trenerService = trenerService;
        this.korisnikServis = korisnikServis;
    }

    @GetMapping(value="/neaktivni")
    public ResponseEntity<List<KorisnikDto>> getAllFitnessCentar(){
        List<KorisnikDto> korisnikDtos = new ArrayList<>();
        for(Korisnik trener: trenerService.getAllNeAktivne()){
            korisnikDtos.add(KorisnikDto.build(trener));
        }
        return new ResponseEntity<>(korisnikDtos, HttpStatus.OK);
    }

    @PutMapping(value="/{id}/aktiviraj")
    public ResponseEntity<KorisnikDto> updateTrener(@PathVariable Long id){
        try{
            return new ResponseEntity<>(KorisnikDto.build(trenerService.aktiviraj(id)), HttpStatus.OK);
        }catch (EntityNotFoundException exc){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Trener(ID: %d) nije pronadjen", id), exc);
        }
    }
}
