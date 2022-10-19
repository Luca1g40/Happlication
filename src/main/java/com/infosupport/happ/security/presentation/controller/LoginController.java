package com.infosupport.happ.security.presentation.controller;

import com.infosupport.happ.domain.exceptions.ItemNotFound;
import com.infosupport.happ.security.presentation.dto.AuthenticationRequest;
import com.infosupport.happ.security.presentation.dto.AuthenticationResponse;
import com.infosupport.happ.security.util.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class LoginController {

    private final UserDetailsService userDetailsService;

    private final JwtUtil jwtTokenUtil;

    public LoginController(UserDetailsService userDetailsService, JwtUtil jwtTokenUtil) {
        this.userDetailsService = userDetailsService;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) {
        try {
            final UserDetails userDetails = userDetailsService
                    .loadUserByUsername(authenticationRequest.getPassword());
            final String jwt = jwtTokenUtil.generateToken(userDetails);
            return ResponseEntity.ok(new AuthenticationResponse(jwt));
        } catch (ItemNotFound e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User is not found");
        }
    }

}