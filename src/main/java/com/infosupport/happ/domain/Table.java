package com.infosupport.happ.domain;

import com.infosupport.happ.domain.exceptions.AttributeMustBeBiggerThanZero;

import javax.persistence.*;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "tafel")
public class Table {

    @Id
    @GeneratedValue
    private Long id;

    @OneToMany
    private List<Order> orders;
    private LocalTime elapsedTimeSinceOrder;
    private LocalTime timeLeftToOrder;
    private int amountOfPeople;


    @Column(unique=true)
    private int tableNumber;
    private TableStatus tableStatus;
    @OneToOne(cascade = CascadeType.ALL)
    private ShoppingCart shoppingCart;

    //TODO GOOI ORDERS
    public Table(LocalTime elapsedTimeSinceOrder, LocalTime timeLeftToOrder, int amountOfPeople, int tableNumber, TableStatus tableStatus, ShoppingCart shoppingCart) {
        if (tableNumber < 0) {
            throw new AttributeMustBeBiggerThanZero(getClass().getSimpleName(), "table number");
        }else if(amountOfPeople < 0) throw new AttributeMustBeBiggerThanZero(getClass().getSimpleName(), "amount of people");


        this.orders = new ArrayList<>();
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

    private void addToOrders(Order order) {
        orders.add(order);
    }

    //TODO meerdere producten verwijderen
    public void deleteFromShoppingCart(Product product) {
        shoppingCart.removeFromShoppingCart(product);
    }

    public void addToShoppingCart(Product product, int amount){
        for (int i=0; i<amount;i++){
            this.shoppingCart.addToShoppingCart(product);
        }
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

    public void placeOrder(){
        Order order = new Order(this, new ArrayList<>());
        this.shoppingCart.getProducts().forEach(order::addToProducts);


//        for (Product product:this.shoppingCart.getProducts()) {
//             order.addToProducts(product);
//        }

        this.addToOrders(order);
        shoppingCart.clearShoppingCart();
    }

    public Order getLastOrder() {
        return orders.get(orders.size() - 1);
    }

    @Override
    public String toString() {
        return "Table{" +
                "id=" + id +
                ", orders=" + orders +
                ", elapsedTimeSinceOrder=" + elapsedTimeSinceOrder +
                ", timeLeftToOrder=" + timeLeftToOrder +
                ", amountOfPeople=" + amountOfPeople +
                ", tableNumber=" + tableNumber +
                ", tableStatus=" + tableStatus +
                ", shoppingCart=" + shoppingCart +
                '}';
    }
}
