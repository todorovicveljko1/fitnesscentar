package com.fitnesscentar.controllers;

import com.fitnesscentar.entities.FitnessCentar;
import com.fitnesscentar.entities.Trening;
import com.fitnesscentar.entities.dto.FitnessCentarDto;
import com.fitnesscentar.entities.dto.TreningDto;
import com.fitnesscentar.services.FitnessCentarService;
import com.fitnesscentar.services.TreningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
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
    public ResponseEntity<List<TreningDto>> getAllFitnessCentar(){
        List<TreningDto> treningDtos = new ArrayList<>();
        for(Trening trening: treningService.getAll()){
            treningDtos.add(TreningDto.build(trening));
        }
        return new ResponseEntity<>(treningDtos, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<TreningDto> getFitnessCentar(@PathVariable Long id) throws EntityNotFoundException {
        try{
            return new ResponseEntity<>(TreningDto.build(treningService.getOne(id)), HttpStatus.OK);
        }catch (EntityNotFoundException exc){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Fitness centar(ID: %d) nije pronadjen", id), exc);
        }
    }

    @PostMapping
    public ResponseEntity<TreningDto> createFitnessCentar(@RequestBody TreningDto treningDto){
        return new ResponseEntity<>(TreningDto.build(treningService.create(treningDto)), HttpStatus.CREATED);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<TreningDto> updateFitnessCentar(@PathVariable Long id, @RequestBody TreningDto treningDto) throws EntityNotFoundException{
        try{
            return new ResponseEntity<>(TreningDto.build(treningService.update(id, treningDto)), HttpStatus.OK);
        }catch (EntityNotFoundException exc){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Fitness centar(ID: %d) nije pronadjen", id), exc);
        }
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity deleteFitnessCentar(@PathVariable Long id){
        treningService.deleteById(id);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
