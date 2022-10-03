package com.infosupport.happ.application.dto;

import com.infosupport.happ.domain.Area;
import com.infosupport.happ.domain.Operation;
import com.infosupport.happ.domain.Order;

import java.util.List;

public class StaffData {

    public final Long id;
    public final int password;
    public final String name;
    public final List<Operation> operations;
    public final List<Order> claimedOrders;
    public final List<Area> area;

    public StaffData(Long id, int password, String name, List<Operation> operations, List<Order> claimedOrders, List<Area> area) {
        this.id = id;
        this.password = password;
        this.name = name;
        this.operations = operations;
        this.claimedOrders = claimedOrders;
        this.area = area;
    }
}
