package com.infosupport.happ.application.dto;

import com.infosupport.happ.domain.Operation;
import com.infosupport.happ.domain.Order;

import java.util.List;

public class StaffWithoutAreasData {
    public final Long id;
    public final int password;
    public final String name;
    public final List<Operation> operations;
    public final List<Order> claimedOrders;

    public StaffWithoutAreasData(Long id, int password, String name, List<Operation> operations, List<Order> claimedOrders) {
        this.id = id;
        this.password = password;
        this.name = name;
        this.operations = operations;
        this.claimedOrders = claimedOrders;
    }
}
