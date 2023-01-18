package com.infosupport.happ.security.presentation.dto;

public class AuthenticationResponse {

    private final String jwt;
    private final long staffId;

    public AuthenticationResponse(String jwt, long staffId) {
        this.jwt = jwt;
        this.staffId = staffId;
    }

    public String getJwt() {
        return jwt;
    }

    public long getStaffId() {
        return staffId;
    }
}
