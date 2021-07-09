package com.fitnesscentar.controllers;

import com.fitnesscentar.JwtTokenUtil;
import com.fitnesscentar.entities.Korisnik;
import com.fitnesscentar.entities.dto.KorisnikDto;
import com.fitnesscentar.entities.dto.KorisnikPrijavaDto;
import com.fitnesscentar.entities.dto.TokenDto;
import com.fitnesscentar.entities.dto.UpdatePassDto;
import com.fitnesscentar.services.KorisnikServis;
import org.apache.catalina.Authenticator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import java.io.NotActiveException;

@RestController
@RequestMapping(value = "/api")
public class AuthController {

    private final KorisnikServis korisnikServis;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenUtil jwtUtil;
    @Autowired
    public AuthController(PasswordEncoder passwordEncoder, KorisnikServis korisnikServis, AuthenticationManager authenticationManager, JwtTokenUtil jwtUtil){

        this.korisnikServis = korisnikServis;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping(value = "/registracija")
    public ResponseEntity<KorisnikDto> registracija(@RequestBody KorisnikDto noviKorisnik) throws ResponseStatusException {
        noviKorisnik.setLozinka(passwordEncoder.encode(noviKorisnik.getLozinka()));
        try{
            return new ResponseEntity<>(KorisnikDto.build(korisnikServis.registruj(noviKorisnik)), HttpStatus.CREATED);
        }catch(EntityExistsException err){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,err.getMessage(),err);
        }
    }
    @PostMapping(value = "/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody KorisnikPrijavaDto authenticationRequest) throws ResponseStatusException {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    authenticationRequest.getKorisnickoIme(), authenticationRequest.getLozika()));
        } catch (DisabledException e) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,"Korisnik nije aktivan", e);
        }
        catch (AuthenticationException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Losa kombinacija korisničkog imena i lozinke", e);
        }

        UserDetails userdetails = korisnikServis.getUserDetailsByUsername(authenticationRequest.getKorisnickoIme());
        TokenDto tokenDto = new TokenDto();
        tokenDto.setToken(jwtUtil.generateToken(userdetails));
        return ResponseEntity.ok(tokenDto);
    }

    @GetMapping(value="/me")
    public ResponseEntity<KorisnikDto> me(@RequestHeader("Authorization") String token){
        String korisnickoIme = jwtUtil.getUsername(token.split(" ")[1].trim());
        return new ResponseEntity<>(KorisnikDto.build(korisnikServis.korisnikSaKorisnickimImenom(korisnickoIme)),HttpStatus.OK);
    }
    @PutMapping(value="/password")
    public ResponseEntity<String> updatePass(@RequestBody UpdatePassDto updatePassDto){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Korisnik korisnik = korisnikServis.korisnikSaKorisnickimImenom(authentication.getName());
        if(passwordEncoder.matches(korisnik.getLozinka(), updatePassDto.getOld_pass())){
            korisnik.setLozinka(passwordEncoder.encode(updatePassDto.getPass()));
            korisnikServis.save(korisnik);
            return new ResponseEntity<>("Uspesno promenjena lozinka", HttpStatus.OK);
        }
        return new ResponseEntity<>("Nije dobra stara sifra", HttpStatus.BAD_REQUEST);
    }
    @PutMapping(value="/me")
    public ResponseEntity<KorisnikDto> updateMe(@RequestBody KorisnikDto korisnikDto){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Korisnik korisnik = korisnikServis.korisnikSaKorisnickimImenom(authentication.getName());
        korisnikDto.setLozinka(korisnik.getLozinka());
        korisnik.fill(korisnikDto);
        korisnikServis.save(korisnik);
        return new ResponseEntity<>(KorisnikDto.build(korisnik), HttpStatus.OK);
    }

}
