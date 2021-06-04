package com.fitnesscentar.services;

import com.fitnesscentar.entities.Korisnik;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface UserDetailsService {

    Korisnik loadUserByUsername(String username)
            throws UsernameNotFoundException;

}