package com.infosupport.happ.application.dto;

import com.infosupport.happ.domain.Area;
import com.infosupport.happ.domain.Operation;
import com.infosupport.happ.domain.Order;

import java.util.List;

public class StaffData {

    private final Long id;
    private final int password;
    private final String name;
    private final List<Operation> operations;
    private final List<Order> claimedOrders;
    private final List<Area> area;

    public StaffData(Long id, int password, String name, List<Operation> operations, List<Order> claimedOrders, List<Area> area) {
        this.id = id;
        this.password = password;
        this.name = name;
        this.operations = operations;
        this.claimedOrders = claimedOrders;
        this.area = area;
    }
}
