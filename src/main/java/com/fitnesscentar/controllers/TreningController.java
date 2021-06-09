package com.fitnesscentar.controllers;

import com.fitnesscentar.entities.Termin;
import com.fitnesscentar.entities.Trening;
import com.fitnesscentar.entities.dto.TreningDto;
import com.fitnesscentar.entities.dto.TreningTerminDto;
import com.fitnesscentar.services.TreningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(value = "/api/treninzi")
public class TreningController {

    private final TreningService treningService;

    @Autowired
    public TreningController(TreningService treningService) {
        this.treningService = treningService;
    }


    @GetMapping
    public ResponseEntity<List<TreningDto>> getAllTrening(){
        List<TreningDto> treningDtos = new ArrayList<>();
        for(Trening trening: treningService.getAll()){
            treningDtos.add(TreningDto.build(trening));
        }
        return new ResponseEntity<>(treningDtos, HttpStatus.OK);
    }

    @GetMapping(value="/termini")
    public ResponseEntity<List<TreningTerminDto>> getAllTreningTermini(){
        List<TreningTerminDto> treningTerminDtos = new ArrayList<>();
        for(Trening trening: treningService.getAll()){
            for(Termin termin: trening.getTermini())
            treningTerminDtos.add(TreningTerminDto.build(termin));
        }

        return new ResponseEntity<>(treningTerminDtos, HttpStatus.OK);
    }

    @GetMapping(value="/search")
    public ResponseEntity<List<TreningTerminDto>> search(
            @RequestParam(defaultValue = "") String naziv,
            @RequestParam(defaultValue = "") String opis,
            @RequestParam(defaultValue = "") String tip,
            @RequestParam(defaultValue = "0") double cena,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date vremePocetka,
            @RequestParam(defaultValue = "") String orderBy,
            @RequestParam(defaultValue = "") String direction){
        List<TreningTerminDto> treningTerminDtos = new ArrayList<>();
        List<Termin> t = treningService.search(naziv, opis, tip, cena, vremePocetka, orderBy,direction);
        for(Termin termin: t){
            treningTerminDtos.add(TreningTerminDto.build(termin));
        }

        return new ResponseEntity<>(treningTerminDtos, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<TreningDto> getTrening(@PathVariable Long id) throws EntityNotFoundException {
        try{
            return new ResponseEntity<>(TreningDto.build(treningService.getOne(id)), HttpStatus.OK);
        }catch (EntityNotFoundException exc){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Fitness centar(ID: %d) nije pronadjen", id), exc);
        }
    }

    @PostMapping
    public ResponseEntity<TreningDto> createTrening(@RequestBody TreningDto treningDto){
        return new ResponseEntity<>(TreningDto.build(treningService.create(treningDto)), HttpStatus.CREATED);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<TreningDto> updateTrening(@PathVariable Long id, @RequestBody TreningDto treningDto) throws EntityNotFoundException{
        try{
            return new ResponseEntity<>(TreningDto.build(treningService.update(id, treningDto)), HttpStatus.OK);
        }catch (EntityNotFoundException exc){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Fitness centar(ID: %d) nije pronadjen", id), exc);
        }
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity deleteTrening(@PathVariable Long id){
        treningService.deleteById(id);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
