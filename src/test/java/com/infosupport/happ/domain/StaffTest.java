package com.infosupport.happ.domain;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;


public class StaffTest {
    Staff staff;

    @BeforeEach
    void beforeEach(){
        staff = new Staff(123,"Johan");
    }


    @Test
    void addArea(){
        Area area = new Area();
        staff.addArea(area);
        assertTrue(staff.getAreas().contains(area));
    }

    @Test
    void claimOrder(){
        Order order = new Order();
        staff.addOrder(order);
        assertTrue(staff.getClaimedOrders().contains(order));
    }

}
