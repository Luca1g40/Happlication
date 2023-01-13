package com.infosupport.happ.security.application;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String password) throws UsernameNotFoundException {
        return new User("staff", password, new ArrayList<>());
    }
}

