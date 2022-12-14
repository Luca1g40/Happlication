package com.infosupport.happ.domain;

import com.infosupport.happ.domain.exceptions.AttributeMustBeBiggerThanZero;

import javax.persistence.*;
import java.time.LocalTime;
import java.util.List;

@Entity(name = "tafel")
public class Table {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToMany
    private List<Order> orders;
    private LocalTime elapsedTimeSinceOrder;
    private LocalTime timeLeftToOrder;
    private int amountOfPeople;
    private int tableNumber;
    private TableStatus tableStatus;
    @OneToOne(cascade = CascadeType.ALL)
    private ShoppingCart shoppingCart;

    public Table(List<Order> orders, LocalTime elapsedTimeSinceOrder, LocalTime timeLeftToOrder, int amountOfPeople, int tableNumber, TableStatus tableStatus, ShoppingCart shoppingCart) {
        if (tableNumber < 0) {
            throw new AttributeMustBeBiggerThanZero(getClass().getSimpleName(), "table number");
        }
        this.orders = orders;
        this.elapsedTimeSinceOrder = elapsedTimeSinceOrder;
        this.timeLeftToOrder = timeLeftToOrder;
        this.amountOfPeople = amountOfPeople;
        this.tableNumber = tableNumber;
        this.tableStatus = tableStatus;
        this.shoppingCart = shoppingCart;
    }

    public Table() {
    }

    public int getAmountOfPeople() {
        return amountOfPeople;
    }

    public int getTableNumber() {
        return tableNumber;
    }

    public LocalTime getElapsedTimeSinceOrder() {
        return elapsedTimeSinceOrder;
    }

    public LocalTime getTimeLeftToOrder() {
        return timeLeftToOrder;
    }

    public List<Order> getOrders() {
        return orders;
    }

    public TableStatus getTableStatus() {
        return tableStatus;
    }

    public void addToShoppingCart(Order order) {
        orders.add(order);
    }

    public void deleteFromShoppingCart(Product product) {
        shoppingCart.removeFromShoppingCart(product);
    }

    public Long getId() {
        return id;
    }

    public void editShoppingCart(List<Product> products) {
        shoppingCart.editShoppingCart(products);
    }

    public ShoppingCart getShoppingCart() {
        return shoppingCart;
    }

    public void moveProductsFromShoppingCartToOrders(Order order) {
        for (Product product : shoppingCart.getProducts()) {
            order.addToProducts(product);
        }
        shoppingCart.clearShoppingCart();
        this.orders.add(order);
    }
}
