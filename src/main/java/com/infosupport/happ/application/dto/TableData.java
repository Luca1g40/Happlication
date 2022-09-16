package com.infosupport.happ.application.dto;

import com.infosupport.happ.domain.Order;

import java.time.LocalTime;
import java.util.List;

public class TableData {
    public final int amountOfPeople;
    public final int tableNumber;
    public final LocalTime elapsedTimeSinceOrder;
    public final LocalTime timeLeftToOrder;
    public final List<Order> orders;


    public TableData(int amountOfPeople, int tableNumber, LocalTime elapsedTimeSinceOrder, LocalTime timeLeftToOrder, List<Order> orders) {
        this.amountOfPeople = amountOfPeople;
        this.tableNumber = tableNumber;
        this.elapsedTimeSinceOrder = elapsedTimeSinceOrder;
        this.timeLeftToOrder = timeLeftToOrder;
        this.orders = orders;
    }
}
