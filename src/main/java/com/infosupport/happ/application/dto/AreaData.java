package com.infosupport.happ.application.dto;

import com.infosupport.happ.domain.Staff;
import com.infosupport.happ.domain.Table;

import java.util.List;

public class AreaData {
    public final String name;
    public final List<Table> tables;
    public final List<Staff> staffList;

    public AreaData(String name, List<Table> tables, List<Staff> staffList) {
        this.name = name;
        this.tables = tables;
        this.staffList = staffList;
    }
}