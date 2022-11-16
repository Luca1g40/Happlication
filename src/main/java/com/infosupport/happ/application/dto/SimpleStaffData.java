package com.infosupport.happ.application.dto;

import com.infosupport.happ.domain.Rights;

import java.util.List;

public class SimpleStaffData {

    public final Long id;
    public final String name;
    public final List<Rights> rights;

    public SimpleStaffData(Long id, String name, List<Rights> rights) {
        this.id = id;
        this.name = name;
        this.rights = rights;
    }
}
