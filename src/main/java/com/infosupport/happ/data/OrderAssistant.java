package com.infosupport.happ.data;

import com.infosupport.happ.domain.Order;
import com.infosupport.happ.domain.Product;
import com.infosupport.happ.domain.Staff;
import com.infosupport.happ.domain.Table;
import org.springframework.stereotype.Component;

@Component
public interface OrderAssistant {

    Staff getStaff(Long staffId);

    Table getTable(Long id);
    Order getOrderById(Long orderId);

    boolean existsById(Long id);

    Product getProductById(Long id);
}
