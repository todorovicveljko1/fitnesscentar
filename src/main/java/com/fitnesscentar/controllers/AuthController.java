package com.fitnesscentar.controllers;

import com.fitnesscentar.JwtTokenUtil;
import com.fitnesscentar.entities.Korisnik;
import com.fitnesscentar.entities.dto.KorisnikDto;
import com.fitnesscentar.entities.dto.KorisnikPrijavaDto;
import com.fitnesscentar.entities.dto.TokenDto;
import com.fitnesscentar.services.KorisnikServis;
import org.apache.catalina.Authenticator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.EntityNotFoundException;
import java.io.NotActiveException;

@CrossOrigin
@RestController
@RequestMapping(value = "/api")
public class AuthController {

    private final KorisnikServis korisnikServis;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtUtil;
    @Autowired
    public AuthController(KorisnikServis korisnikServis, AuthenticationManager authenticationManager, JwtTokenUtil jwtUtil){

        this.korisnikServis = korisnikServis;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping(value = "/registracija")
    public ResponseEntity<KorisnikDto> registracija(@RequestBody KorisnikDto noviKorisnik){
        return new ResponseEntity<>(KorisnikDto.build(korisnikServis.registruj(noviKorisnik)), HttpStatus.CREATED);
    }
    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody KorisnikPrijavaDto authenticationRequest)
            throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    authenticationRequest.getKorisnickoIme(), authenticationRequest.getLozika()));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        }
        catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }

        UserDetails userdetails = korisnikServis.getUserDetailsByUsername(authenticationRequest.getKorisnickoIme());
        TokenDto tokenDto = new TokenDto();
        tokenDto.setToken(jwtUtil.generateToken(userdetails));
        return ResponseEntity.ok(tokenDto);
    }
    @PostMapping(value = "/prijava")
    public ResponseEntity<KorisnikDto> prijavise(@RequestBody KorisnikPrijavaDto podaci) throws ResponseStatusException{
        try{
            Korisnik k = korisnikServis.prijava(podaci);
            return new ResponseEntity<>(KorisnikDto.build(k), HttpStatus.OK);
        }catch (EntityNotFoundException exc){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, exc.getMessage(), exc);

        }catch (NotActiveException exc){
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, exc.getMessage(), exc);
        }
    }

    @GetMapping(value="/me")
    public ResponseEntity<KorisnikDto> me(@RequestHeader("Authorization") String token){
        String korisnickoIme = jwtUtil.getUsername(token.split(" ")[1].trim());
        return new ResponseEntity<>(KorisnikDto.build(korisnikServis.korisnikSaKorisnickimImenom(korisnickoIme)),HttpStatus.OK);
    }

}
