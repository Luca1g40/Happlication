package com.infosupport.happ.application.dto;

import com.infosupport.happ.domain.Operation;
import com.infosupport.happ.domain.Order;
import com.infosupport.happ.domain.Rights;

import java.util.List;

public class StaffWithoutAreasData {
    public final Long id;
    public final String name;
    public final List<Operation> operations;
    public final List<Order> claimedOrders;
    public final List<Rights> rights;

    public StaffWithoutAreasData(Long id, String name, List<Operation> operations, List<Order> claimedOrders, List<Rights> rights) {
        this.id = id;
        this.name = name;
        this.operations = operations;
        this.claimedOrders = claimedOrders;
        this.rights = rights;
    }
}
