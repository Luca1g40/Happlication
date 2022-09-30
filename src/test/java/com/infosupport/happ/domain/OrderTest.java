package com.infosupport.happ.domain;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static com.infosupport.happ.domain.PreperationStatus.*;
import static org.junit.jupiter.api.Assertions.*;

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
        this.order = new Order(this.table, LocalDateTime.now(), products);
    }

    @Test
    @DisplayName("Order can be claimed by staff member")
    void staffClaimsOrder() {
        assertEquals(UNCLAIMED, order.getPreperationStatus());
        order.claimOrder();
        assertEquals(CLAIMED, order.getPreperationStatus());
    }

    @Test
    @DisplayName("Order knows if products are done or not")
    void productOfOrderIsDone() {

        assertFalse(order.checkIfAllProductsAreDone());
        product.switchReadyStatus();
        assertTrue(order.checkIfAllProductsAreDone());
    }

    @Test
    @DisplayName("Order can't be set to done before all products are ready")
    void orderIsDone() {

        assertNotEquals(DONE, order.getPreperationStatus());
        this.product.switchReadyStatus();
        order.setPreperationStatusToDone();
        assertEquals(DONE, order.getPreperationStatus());
    }

    @Test
    void placeOrder(){

    }

}


