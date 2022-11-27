package com.infosupport.happ.security.presentation.controller;

import com.infosupport.happ.application.StaffService;
import com.infosupport.happ.domain.Staff;
import com.infosupport.happ.domain.exceptions.ItemNotFound;
import com.infosupport.happ.security.presentation.dto.AuthenticationRequest;
import com.infosupport.happ.security.presentation.dto.AuthenticationResponse;
import com.infosupport.happ.security.util.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class LoginController {

    private final StaffService staffService;

    private final JwtUtil jwtTokenUtil;

    public LoginController(JwtUtil jwtTokenUtil, StaffService staffService) {
        this.jwtTokenUtil = jwtTokenUtil;
        this.staffService = staffService;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) {
        try {
            if(authenticationRequest.password != null) {
                Staff staff = staffService.getStaffByPassword(Integer.parseInt(authenticationRequest.password));

                List<String> roles = staff.getAuthorities()
                        .stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.toList());

                final String jwt = jwtTokenUtil.generateToken(String.valueOf(staff.getPassword()), roles);
                return ResponseEntity.ok().body(new AuthenticationResponse(jwt, staff.getId()));
            } throw new ItemNotFound("Staff");
        } catch (ItemNotFound e) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "User is not found");
        }
    }

}