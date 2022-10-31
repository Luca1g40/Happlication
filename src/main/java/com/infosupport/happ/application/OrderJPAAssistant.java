package com.infosupport.happ.application;

import com.infosupport.happ.data.OrderAssistant;
import com.infosupport.happ.domain.*;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;

@Component
public class OrderJPAAssistant implements OrderAssistant {

    private final EntityManager entities;

    public OrderJPAAssistant(EntityManager entities) {
        this.entities = entities;
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
    public Order getOrderById(Long orderId) {
        if (!(entities.find(BarOrder.class, orderId) ==null)){
            return entities.find(BarOrder.class, orderId);
        }else{
            return entities.find(KitchenOrder.class, orderId);
        }
    }


    @Override
    public boolean existsById(Long id) {
        return entities.find(Order.class, id) != null;
    }

    @Override
    public Product getProductById(Long id) {
        return entities.find(Product.class, id);
    }


}
