package com.infosupport.happ.domain;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;

public class StaffTest {

    Staff staff;
    Order order;

    @BeforeEach
    void beforeEach() {
        staff = new Staff(111, "staff",new ArrayList<>());
        order = new Order();

    }

    @Test
    @DisplayName("add claimed orders to staff")
    void addOrder() {
        staff.addOrder(order);
        assertNotNull(staff.getClaimedOrders());
    }
}
