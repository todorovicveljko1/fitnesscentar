package com.fitnesscentar.controllers;

import com.fitnesscentar.entities.dto.FitnessCentarDto;
import com.fitnesscentar.entities.dto.SalaDto;
import com.fitnesscentar.services.FitnessCentarService;
import com.fitnesscentar.services.SalaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.EntityNotFoundException;

@RestController
@RequestMapping(value = "/api/sale")
public class SalaController {

    private final SalaService salaService;

    @Autowired
    public SalaController(SalaService salaService) {
        this.salaService = salaService;
    }

    @PutMapping(value = "/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<SalaDto> update(@PathVariable Long id, @RequestBody SalaDto SalaDto) throws ResponseStatusException {
        try{
            return new ResponseEntity<>(SalaDto.build(salaService.update(id, SalaDto)), HttpStatus.OK);
        }catch (EntityNotFoundException exc){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Sala(ID: %d) nije pronadjen", id), exc);
        }
    }

    @DeleteMapping(value = "/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity delete(@PathVariable Long id){
        salaService.deleteById(id);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
