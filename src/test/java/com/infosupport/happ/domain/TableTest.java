package com.infosupport.happ.domain;
import com.infosupport.happ.domain.exceptions.AttributeMustBeBiggerThanZero;
import org.junit.jupiter.api.Assertions;
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
    void beforeEach() {
        order = new Order();
        productList = new ArrayList<>();
        shoppingCart = new ShoppingCart();
        product = new Product("champagne", new ArrayList<>(), ProductCategory.DRINKS, 56.99);
        product2 = new Product("Broodje frikandel", new ArrayList<>(), ProductCategory.STARTER, 25.50);
        table = new Table(new ArrayList<>(), java.time.LocalTime.now(), java.time.LocalTime.now(), 5, 1, com.infosupport.happ.domain.TableStatus.OCCUPIED, shoppingCart);
    }

    @Test
    @DisplayName("ShoppingCart is cleared when placing a order")
    void shopppingcartCleared(){
        shoppingCart.addToShoppingCart(product);
        table.placeOrder();
        assertEquals(0, table.getShoppingCart().getProducts().size());
    }

    @Test
    @DisplayName("Correct products are placed in the order after placing the order.")
    void correctProductsInOrder() {
        table.addToShoppingCart(product2);
        table.placeOrder();
        assertEquals(List.of(product2),table.getLastOrder().getProducts());
        assertEquals(table.getLastOrder().getProducts(), List.of(product2));
    }


        @Test
        @DisplayName("Throws AttributeMustBeBiggerThanZero exception because of negative table number")
        void negativeTableNumber () {
            AttributeMustBeBiggerThanZero thrown = Assertions.assertThrows(AttributeMustBeBiggerThanZero.class, () -> {
                table = new Table(new ArrayList<>(), java.time.LocalTime.now(), java.time.LocalTime.now(), 10, -5, com.infosupport.happ.domain.TableStatus.OCCUPIED, new ShoppingCart());
            });
            Assertions.assertEquals(table.getClass().getSimpleName() + " table number cannot be a negative number.", thrown.getMessage());
        }
    @Test
    @DisplayName("Shoppingcart is correctly editted")
    void shoppingcartEdit(){
        table.addToShoppingCart(product2);
        table.addToShoppingCart(product);
        table.editShoppingCart(new ArrayList<>());
        assertEquals(new ArrayList<>(),table.getShoppingCart().getProducts());
    }
    @Test
    @DisplayName("Throws AttributeMustBeBiggerThanZero exception because of negative amount of people")
    void negativeAmountOfPeople(){
        AttributeMustBeBiggerThanZero thrown = Assertions.assertThrows(AttributeMustBeBiggerThanZero.class, () -> {
            table = new Table(new ArrayList<>(), java.time.LocalTime.now(), java.time.LocalTime.now(),-10,5, com.infosupport.happ.domain.TableStatus.OCCUPIED,new ShoppingCart());
        });
        Assertions.assertEquals(table.getClass().getSimpleName()+" amount of people cannot be a negative number.", thrown.getMessage());
    }

    }
