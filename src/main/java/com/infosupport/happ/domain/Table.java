package com.infosupport.happ.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Table {

    @Id
    @GeneratedValue
    private Long id;
    private int amountOfPeople;
    private int tableNumber;
    private LocalDateTime elapsedTimeSinceOrder;
    private LocalDateTime timeLeftToOrder;
    @OneToMany
    private List<Order> orders;

    public Table(int amountOfPeople, int tableNumber, LocalDateTime elapsedTimeSinceOrder, LocalDateTime timeLeftToOrder, ArrayList<Order> orders) {
        this.amountOfPeople = amountOfPeople;
        this.tableNumber = tableNumber;
        this.elapsedTimeSinceOrder = elapsedTimeSinceOrder;
        this.timeLeftToOrder = timeLeftToOrder;
        this.orders = orders;
    }

    public Table() {
    }
}
