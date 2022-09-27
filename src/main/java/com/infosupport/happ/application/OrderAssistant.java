package com.infosupport.happ.application;

import com.infosupport.happ.domain.Order;
import com.infosupport.happ.domain.Staff;
import com.infosupport.happ.domain.Table;

public interface OrderAssistant {

    Staff getStaff(Long staffId);

    void moveProductsFromShoppingCartToOrders(Long id, Order order);

    Table getTable(Long id);
}
