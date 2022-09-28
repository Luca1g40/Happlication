package com.infosupport.happ.data;

import com.infosupport.happ.domain.Order;
import com.infosupport.happ.domain.Staff;
import com.infosupport.happ.domain.Table;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.ReadOnlyProperty;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

@Component
public interface OrderAssistant {

    Staff getStaff(Long staffId);

    Table getTable(Long id);

    Order getOrderById(Long id);

    boolean existsById(Long id);
}
