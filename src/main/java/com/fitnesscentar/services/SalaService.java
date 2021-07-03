package com.fitnesscentar.services;

import com.fitnesscentar.entities.FitnessCentar;
import com.fitnesscentar.entities.Sala;
import com.fitnesscentar.entities.dto.SalaDto;
import com.fitnesscentar.repositories.SalaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;

@Service
public class SalaService {

    private final SalaRepository salaRepository;
    @Autowired
    public SalaService(SalaRepository salaRepository){
        this.salaRepository = salaRepository;
    }
    public Sala getOne(Long id) throws EntityNotFoundException {
        Optional<Sala> optionalSala = salaRepository.findById(id);
        if(optionalSala.isPresent())
            return optionalSala.get();
        throw new EntityNotFoundException();
    }
    public Sala update(Long id, SalaDto salaDto){
        Sala sala = this.getOne(id);
        sala.fill(salaDto);
        return this.salaRepository.save(sala);
    }

    public void deleteById(Long id){
        if(this.salaRepository.existsById(id)){
            this.salaRepository.deleteById(id);
        }
    }
}
