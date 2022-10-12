package com.infosupport.happ.application.dto;

import com.infosupport.happ.domain.Table;

import java.util.List;

public class AreaWithoutStaffData {
    public final Long id;
    public final String name;
    public final List<Table> tables;


    public AreaWithoutStaffData(Long id, String name, List<Table> tables) {
        this.id = id;
        this.name = name;
        this.tables = tables;
    }
}
