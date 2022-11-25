package com.infosupport.happ.application.dto;

import java.util.List;

public class AreaData {
    public final Long id;
    public final String name;
    public final List<TableData> tables;
    public final List<StaffWithoutAreasData> staffWithoutAreasList;


    public AreaData(Long id, String name, List<TableData> tables, List<StaffWithoutAreasData> staffWithoutAreasList) {
        this.id = id;
        this.name = name;
        this.tables = tables;
        this.staffWithoutAreasList = staffWithoutAreasList;
    }
}
