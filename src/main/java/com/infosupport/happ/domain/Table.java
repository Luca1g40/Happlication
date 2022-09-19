package com.infosupport.happ.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
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
    @OneToMany
    private List<Area> area;
    private LocalTime elapsedTimeSinceOrder;
    private LocalTime timeLeftToOrder;
    private int amountOfPeople;
    private int tableNumber;

    public Table(List<Order> orders, List<Area> area, LocalTime elapsedTimeSinceOrder, LocalTime timeLeftToOrder, int amountOfPeople, int tableNumber) {
        this.orders = orders;
        this.area = area;
        this.elapsedTimeSinceOrder = elapsedTimeSinceOrder;
        this.timeLeftToOrder = timeLeftToOrder;
        this.amountOfPeople = amountOfPeople;
        this.tableNumber = tableNumber;
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
}
