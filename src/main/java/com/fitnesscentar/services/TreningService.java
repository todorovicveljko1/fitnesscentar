package com.fitnesscentar.services;

import com.fitnesscentar.entities.FitnessCentar;
import com.fitnesscentar.entities.Trening;
import com.fitnesscentar.entities.dto.FitnessCentarDto;
import com.fitnesscentar.entities.dto.TreningDto;
import com.fitnesscentar.repositories.FitnessCentarRepository;
import com.fitnesscentar.repositories.TreningRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class TreningService {
    private final TreningRepository treningRepository;

    @Autowired
    public TreningService(TreningRepository treningRepository){
        this.treningRepository = treningRepository;
    }

    public Trening getOne(Long id) throws EntityNotFoundException {
        Optional<Trening> optionalTrening = treningRepository.findById(id);
        if(optionalTrening.isPresent())
            return optionalTrening.get();
        throw new EntityNotFoundException();
    }

    public List<Trening> getAll() {
        return treningRepository.findAll();
    }

    public Trening create(TreningDto treningDto) {
        Trening trening = new Trening();
        trening.fill(treningDto);
        return treningRepository.save(trening);
    }

    public Trening update(Long id, TreningDto treningDto) throws EntityNotFoundException{
        Trening trening = this.getOne(id);
        trening.fill(treningDto);
        return treningRepository.save(trening);
    }

    public void deleteById(Long id){
        if(treningRepository.existsById(id)){
            treningRepository.deleteById(id);
        }
    }
}
