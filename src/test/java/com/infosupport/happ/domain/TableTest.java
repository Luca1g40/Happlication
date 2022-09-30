package com.infosupport.happ.domain;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;


public class TableTest {
    Product product = new Product();
    Product product2 = new Product();
    Order order;
    List<Product> productList;
    Table table;
    ShoppingCart shoppingCart;

    @BeforeEach
    void beforeEach(){
        order = new Order();
        productList = new ArrayList<>();
        shoppingCart = new ShoppingCart(productList);
        product = new Product("Champagne",new ArrayList<>(),ProductCategory.DRINKS,56.99);
        product2 = new Product("Broodje frikandel",new ArrayList<>(),ProductCategory.STARTER,25.50);
        table = new Table(new ArrayList<>(), java.time.LocalTime.now(), java.time.LocalTime.now(),5,1, com.infosupport.happ.domain.TableStatus.OCCUPIED,shoppingCart);
    }

    @Test
    @DisplayName("ShoppingCart is cleared when placing a new order")
    void placeOrder(){
        shoppingCart.addToShoppingCart(product);
        table.placeOrder();
        assertEquals(0,table.getShoppingCart().getProducts().size());
    }

    @Test
    @DisplayName("Correct products are placed in the order after placing the order.")
    void correctProductsInOrder(){
        table.addToShoppingCart(product2);
        table.placeOrder();
        assertEquals(table.getShoppingCart().getProducts(),List.of(product2));
    }






}
