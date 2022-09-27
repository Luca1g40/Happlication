package com.infosupport.happ.application;

import com.infosupport.happ.domain.Order;
import com.infosupport.happ.domain.Staff;
import com.infosupport.happ.domain.Table;

import javax.persistence.EntityManager;

public class OrderJPAAssistant implements OrderAssistant {

    private EntityManager entities;

    public OrderJPAAssistant(EntityManager entities){
        this.entities=entities;
    }

    @Override
    public Staff getStaff(Long staffId) {
        return entities.find(Staff.class, staffId);
    }

    @Override
    public void moveProductsFromShoppingCartToOrders(Long id, Order order) {

    }

    @Override
    public Table getTable(Long id) {
        return entities.find(Table.class, id);
    }
}
