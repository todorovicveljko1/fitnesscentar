package com.fitnesscentar.controllers;

import com.fitnesscentar.entities.FitnessCentar;
import com.fitnesscentar.entities.Sala;
import com.fitnesscentar.entities.Uloga;
import com.fitnesscentar.entities.dto.FitnessCentarDto;
import com.fitnesscentar.entities.dto.SalaDto;
import com.fitnesscentar.services.FitnessCentarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.annotation.security.RolesAllowed;
import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;
@RestController
@RequestMapping(value = "/api/fitnesscentar")
public class FitnessCentarController {

    private final FitnessCentarService fitnessCentarService;

    @Autowired
    public FitnessCentarController(FitnessCentarService fitnessCentarService) {
        this.fitnessCentarService = fitnessCentarService;
    }


    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('TRENER')")
    public ResponseEntity<List<FitnessCentarDto>> getAllFitnessCentar(){
        List<FitnessCentarDto> fcd = new ArrayList<>();
        for(FitnessCentar fc: fitnessCentarService.getAll()){
            fcd.add(FitnessCentarDto.build(fc));
        }
        return new ResponseEntity<>(fcd, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('TRENER')")
    public ResponseEntity<FitnessCentarDto> getFitnessCentar(@PathVariable Long id) throws EntityNotFoundException{
        try{
            return new ResponseEntity<>(FitnessCentarDto.build(fitnessCentarService.getOne(id)), HttpStatus.OK);
        }catch (EntityNotFoundException exc){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Fitness centar(ID: %d) nije pronadjen", id), exc);
        }
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<FitnessCentarDto> createFitnessCentar(@RequestBody FitnessCentarDto fitnessCentarDto){
        return new ResponseEntity<>(FitnessCentarDto.build(fitnessCentarService.create(fitnessCentarDto)), HttpStatus.CREATED);
    }

    @PutMapping(value = "/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<FitnessCentarDto> updateFitnessCentar(@PathVariable Long id, @RequestBody FitnessCentarDto fitnessCentarDto) throws EntityNotFoundException{
        try{
            return new ResponseEntity<>(FitnessCentarDto.build(fitnessCentarService.update(id, fitnessCentarDto)), HttpStatus.OK);
        }catch (EntityNotFoundException exc){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Fitness centar(ID: %d) nije pronadjen", id), exc);
        }
    }

    @DeleteMapping(value = "/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity deleteFitnessCentar(@PathVariable Long id){
        fitnessCentarService.deleteById(id);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @GetMapping(value = "/{id}/sale")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<SalaDto>> getFitnessCentarSale(@PathVariable Long id){
        List<SalaDto> saleDto = new ArrayList<>();
        for(Sala s: fitnessCentarService.getOne(id).getSale()){
            saleDto.add(SalaDto.build(s));
        }
        return new ResponseEntity<>(saleDto, HttpStatus.OK);
    }

    @PostMapping(value = "/{id}/sale")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<SalaDto> addSale(@PathVariable Long id, @RequestBody SalaDto salaDto){

        return new ResponseEntity<>(SalaDto.build(fitnessCentarService.addSala(id, salaDto)), HttpStatus.CREATED);
    }

}
