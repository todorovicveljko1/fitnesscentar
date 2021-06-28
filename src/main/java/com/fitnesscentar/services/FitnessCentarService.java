package com.fitnesscentar.services;

import com.fitnesscentar.entities.FitnessCentar;
import com.fitnesscentar.entities.Sala;
import com.fitnesscentar.entities.dto.FitnessCentarDto;
import com.fitnesscentar.entities.dto.SalaDto;
import com.fitnesscentar.repositories.FitnessCentarRepository;
import com.fitnesscentar.repositories.SalaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class FitnessCentarService {

    private final FitnessCentarRepository fitnessCentarRepository;
    private final SalaRepository salaRepository;

    @Autowired
    public FitnessCentarService(FitnessCentarRepository fitnessCentarRepository, SalaRepository salaRepository){
        this.fitnessCentarRepository = fitnessCentarRepository;
        this.salaRepository = salaRepository;
    }

    public FitnessCentar getOne(Long id) throws EntityNotFoundException {
        Optional<FitnessCentar> optionalFC = fitnessCentarRepository.findById(id);
        if(optionalFC.isPresent())
            return optionalFC.get();
        throw new EntityNotFoundException();
    }

    public List<FitnessCentar> getAll() {
        return fitnessCentarRepository.findAll();
    }

    public FitnessCentar create(FitnessCentarDto fitnessCentarDto) {
        FitnessCentar fc = new FitnessCentar();
        fc.setNaziv(fitnessCentarDto.getNaziv());
        fc.setAdresa(fitnessCentarDto.getAdresa());
        fc.setEmail(fitnessCentarDto.getEmail());
        fc.setTelefon(fitnessCentarDto.getTelefon());
        return fitnessCentarRepository.save(fc);
    }

    public FitnessCentar update(Long id, FitnessCentarDto fitnessCentarDto) throws EntityNotFoundException{
        FitnessCentar fc = this.getOne(id);
        fc.setNaziv(fitnessCentarDto.getNaziv());
        fc.setAdresa(fitnessCentarDto.getAdresa());
        fc.setEmail(fitnessCentarDto.getEmail());
        fc.setTelefon(fitnessCentarDto.getTelefon());
        return fitnessCentarRepository.save(fc);
    }

    public void deleteById(Long id){
        if(fitnessCentarRepository.existsById(id)){
            fitnessCentarRepository.deleteById(id);
        }
    }
    public Sala addSala(Long id, SalaDto salaDto){
        FitnessCentar fc = this.getOne(id);
        Sala s = new Sala().fill(salaDto);
        s.setFitnessCentar(fc);
        salaRepository.save(s);
        return s;
    }
}
