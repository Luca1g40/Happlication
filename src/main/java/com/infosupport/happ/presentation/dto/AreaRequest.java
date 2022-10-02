package com.infosupport.happ.presentation.dto;

import com.infosupport.happ.domain.Staff;
import com.infosupport.happ.domain.Table;

import java.util.List;

public class AreaRequest {
    public String name;
    public List<Table> tables;
    public List<Staff> staffList;
}
