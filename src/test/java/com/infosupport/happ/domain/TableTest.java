package com.infosupport.happ.domain;

import com.infosupport.happ.domain.exceptions.AttributeMustBeBiggerThanZero;
import com.infosupport.happ.domain.exceptions.NotEnoughIngredientsException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.web.bind.annotation.GetMapping;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import static com.infosupport.happ.domain.TableStatus.OCCUPIED;
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
        table = new Table(LocalTime.now(), LocalTime.now(), 5, 1, OCCUPIED, shoppingCart, false);
    }

    @Test
    @DisplayName("AttributeMustBeBiggerThanZero")
    void tableNumberIsNegative() {
        assertThrows(AttributeMustBeBiggerThanZero.class, () -> new Table(LocalTime.now(), LocalTime.now(), 5, -1, OCCUPIED, shoppingCart, false));
    }

    @Test
    @DisplayName("ShoppingCart is cleared when placing a new order")
    void placeOrder() {
        shoppingCart.addToShoppingCart(product);
        table.placeOrder();
        assertEquals(0, table.getShoppingCart().getProducts().size());
    }

    @Test
    @DisplayName("Correct products are placed in the order after placing the order.")
    void correctProductsInOrder() {
        table.addToShoppingCart(product2);
        table.placeOrder();

        assertEquals(table.getLastOrder().getProducts(), List.of(product2));
    }

    @Test
    @DisplayName("Deleting product form shoppingcart")
    void deleteProductFromShoppingCart() {
        table.addToShoppingCart(product);
        table.deleteFromShoppingCart(product);
        assertNull(table.getLastOrder());
    }

    @Test
    @DisplayName("Checking or the boolean hulpNodig trueis")
    void isHulpNodigIsTrue() {
        table.setHulpNodig(true);
        assertTrue(table.isHulpNodig());
    }

    @Test
    @DisplayName("Checking or the boolean hulpNodig by default false is")
    void isHulpNodigIsFalse() {
        assertFalse(table.isHulpNodig());
    }

    @Test
    @DisplayName("Checking how many people are sitting on table")
    void getAmountOfPeople() {
        assertEquals(5, table.getAmountOfPeople());
    }

    @Test
    @DisplayName("Checking the table number")
    void getTableNumber() {
        assertEquals(1, table.getTableNumber());
    }

    @Test
    @DisplayName("Checking or the order list is empty")
    void ordersAreEmpty() {
        assertEquals(new ArrayList<>(), table.getOrders());
    }

    @Test
    @DisplayName("Last order is empty")
    void getLastOrderIsEmpty() {
        assertNull(table.getLastOrder());
    }

    @Test
    @DisplayName("Last order is not empty")
    void getLastOrderIsNOtEmpty() {
        table.placeOrder();
        assertEquals(order.getId(), table.getLastOrder().getId());
    }
}
