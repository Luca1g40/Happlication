package com.infosupport.happ.presentation.dto;

import com.infosupport.happ.domain.Area;
import com.infosupport.happ.domain.Operation;
import com.infosupport.happ.domain.Order;

import java.util.List;

public class StaffRequest {
    public int password;
    public String name;
    public Long id;
    public List<Operation> operations;
    public  List<Order> orders;
    public List<Area> area;


}
