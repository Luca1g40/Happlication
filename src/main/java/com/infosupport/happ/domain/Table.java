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

    public Table(List<Order> orders, LocalTime elapsedTimeSinceOrder, LocalTime timeLeftToOrder, int amountOfPeople, int tableNumber, TableStatus tableStatus) {
        if (tableNumber < 0) {
            throw new AttributeMustBeBiggerThanZero(getClass().getSimpleName(), "table number");
        }
        this.orders = orders;
        this.elapsedTimeSinceOrder = elapsedTimeSinceOrder;
        this.timeLeftToOrder = timeLeftToOrder;
        this.amountOfPeople = amountOfPeople;
        this.tableNumber = tableNumber;
        this.tableStatus = tableStatus;

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

}
