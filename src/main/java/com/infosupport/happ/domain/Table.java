package com.infosupport.happ.domain;

import java.time.LocalDateTime;
import java.util.ArrayList;

public class Table {

    private int amountOfPeople;
    private int tableNumber;
    private LocalDateTime elapsedTimeSinceOrder;
    private LocalDateTime timeLeftToOrder;
    private ArrayList<Order> orders;

    public Table(int amountOfPeople, int tableNumber, LocalDateTime elapsedTimeSinceOrder, LocalDateTime timeLeftToOrder, ArrayList<Order> orders) {
        this.amountOfPeople = amountOfPeople;
        this.tableNumber = tableNumber;
        this.elapsedTimeSinceOrder = elapsedTimeSinceOrder;
        this.timeLeftToOrder = timeLeftToOrder;
        this.orders = orders;
    }

}
