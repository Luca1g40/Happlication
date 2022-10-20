package com.infosupport.happ.security.presentation.controller;

import com.infosupport.happ.application.StaffService;
import com.infosupport.happ.domain.Staff;
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

    private final StaffService staffService;

    private final JwtUtil jwtTokenUtil;

    public LoginController(UserDetailsService userDetailsService, JwtUtil jwtTokenUtil, StaffService staffService) {
        this.userDetailsService = userDetailsService;
        this.jwtTokenUtil = jwtTokenUtil;
        this.staffService = staffService;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) {
        try {
            Staff staff = staffService.getStaffByPassword(Integer.parseInt(authenticationRequest.password));
            final UserDetails userDetails = userDetailsService
                    .loadUserByUsername(String.valueOf(staff.getPassword()));
            final String jwt = jwtTokenUtil.generateToken(userDetails);
            return ResponseEntity.ok().body(new AuthenticationResponse(jwt, staff.getId()));
        } catch (ItemNotFound e) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "User is not found");
        }
    }

}