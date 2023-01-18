package com.infosupport.happ.domain;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static com.infosupport.happ.domain.PreperationStatus.CLAIMED;
import static com.infosupport.happ.domain.PreperationStatus.UNCLAIMED;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class OrderTest {

    Order order;
    Product product;
    Table table;

    @BeforeEach
    void beforeEach() {
        this.table = new Table();
        this.product = new Product();
        List<Product> products = new ArrayList<>() {
            {
                add(product);
            }
        };
        this.order = new Order(this.table);
    }

    @Test
    @DisplayName("SingleOrder can be claimed by staff member")
    void staffClaimsOrder() {
        assertEquals(UNCLAIMED, order.getPreperationStatus());
        order.claimOrder();
        assertEquals(CLAIMED, order.getPreperationStatus());
    }

//    @Test
//    @DisplayName("SingleOrder can't be set to done before all products are ready")
//    void orderIsDone() {
//
//        assertNotEquals(DONE, order.getPreperationStatus());
//        order.setPreparationStatusToDone();
//        assertEquals(DONE, order.getPreperationStatus());
//    }

    @Test
    void placeOrder() {

    }

}


