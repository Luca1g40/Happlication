package com.infosupport.happ.application.dto;

import java.util.List;

public class AreaData {
    public final String name;
    public final List<TableData> tables;
    public final List<StaffWithoutAreasData> staffWithoutAreasList;


    public AreaData(String name, List<TableData> tables, List<StaffWithoutAreasData> staffWithoutAreasList) {
        this.name = name;
        this.tables = tables;
        this.staffWithoutAreasList = staffWithoutAreasList;
    }
}
