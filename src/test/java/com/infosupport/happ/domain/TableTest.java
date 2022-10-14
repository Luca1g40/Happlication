package com.infosupport.happ.domain;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import static com.infosupport.happ.domain.TableStatus.OCCUPIED;
import static org.junit.jupiter.api.Assertions.assertEquals;


public class TableTest {
    Product product = new Product();
    Product product2 = new Product();
    Order order;
    List<Product> productList;
    Table table;
    ShoppingCart shoppingCart;

    @BeforeEach
    void beforeEach() {
        order = new Order();
        productList = new ArrayList<>();
        shoppingCart = new ShoppingCart();
        product = new Product("champagne", new ArrayList<>(), ProductCategory.DRINKS, 56.99,"heerlijk champagne");
        product2 = new Product("Broodje frikandel", new ArrayList<>(), ProductCategory.STARTER, 25.50,"goeie broodje frikandel");
        table = new Table(LocalTime.now(), LocalTime.now(), 5, 1, OCCUPIED, shoppingCart);
    }

    @Test
    @DisplayName("ShoppingCart is cleared when placing a new order")
    void placeOrder() {
        shoppingCart.addToShoppingCart(product);
        table.placeOrder();
        assertEquals(0, table.getShoppingCart().getProducts().size());
    }

//    @Test
//    @DisplayName("Correct products are placed in the order after placing the order.")
//    void correctProductsInOrder() {
//        table.addToShoppingCart(product2);
//        table.placeOrder();
//
//        assertEquals(table.getLastOrder().getProducts(), List.of(product2));
//
//    }
}
