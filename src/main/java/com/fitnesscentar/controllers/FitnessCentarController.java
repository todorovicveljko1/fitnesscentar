package com.fitnesscentar.controllers;

import com.fitnesscentar.entities.FitnessCentar;
import com.fitnesscentar.entities.dto.FitnessCentarDto;
import com.fitnesscentar.services.FitnessCentarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/fitnesscentar")
public class FitnessCentarController {

    private final FitnessCentarService fitnessCentarService;

    @Autowired
    public FitnessCentarController(FitnessCentarService fitnessCentarService) {
        this.fitnessCentarService = fitnessCentarService;
    }


    @GetMapping
    public ResponseEntity<List<FitnessCentarDto>> getAllFitnessCentar(){
        List<FitnessCentarDto> fcd = new ArrayList<>();
        for(FitnessCentar fc: fitnessCentarService.getAll()){
            fcd.add(FitnessCentarDto.build(fc));
        }
        return new ResponseEntity<>(fcd, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<FitnessCentarDto> getFitnessCentar(@PathVariable Long id) throws EntityNotFoundException{
        try{
            return new ResponseEntity<>(FitnessCentarDto.build(fitnessCentarService.getOne(id)), HttpStatus.OK);
        }catch (EntityNotFoundException exc){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Fitness centar(ID: %d) nije pronadjen", id), exc);
        }
    }

    @PostMapping
    public ResponseEntity<FitnessCentarDto> createFitnessCentar(@RequestBody FitnessCentarDto fitnessCentarDto){
        return new ResponseEntity<>(FitnessCentarDto.build(fitnessCentarService.create(fitnessCentarDto)), HttpStatus.CREATED);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<FitnessCentarDto> updateFitnessCentar(@PathVariable Long id, @RequestBody FitnessCentarDto fitnessCentarDto) throws EntityNotFoundException{
        try{
            return new ResponseEntity<>(FitnessCentarDto.build(fitnessCentarService.update(id, fitnessCentarDto)), HttpStatus.OK);
        }catch (EntityNotFoundException exc){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Fitness centar(ID: %d) nije pronadjen", id), exc);
        }
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity deleteFitnessCentar(@PathVariable Long id){
        fitnessCentarService.deleteById(id);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }


}
