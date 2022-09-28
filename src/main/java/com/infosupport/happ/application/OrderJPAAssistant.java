package com.infosupport.happ.application;

import com.infosupport.happ.data.OrderAssistant;
import com.infosupport.happ.domain.Order;
import com.infosupport.happ.domain.Staff;
import com.infosupport.happ.domain.Table;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;

@Component
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
    public Table getTable(Long id) {
        return entities.find(Table.class, id);
    }

    @Override
    public Order getOrderById(Long id) {
        return entities.find(Order.class, id);
    }

    @Override
    public boolean existsById(Long id) {
        return false;
    }


}
