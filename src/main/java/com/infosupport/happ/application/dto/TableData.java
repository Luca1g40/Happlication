package com.infosupport.happ.application.dto;

import com.infosupport.happ.domain.Order;
import com.infosupport.happ.domain.ShoppingCart;
import com.infosupport.happ.domain.TableStatus;

import java.time.LocalTime;
import java.util.List;

public class TableData {
    public final int amountOfPeople;
    public final int tableNumber;
    public final LocalTime elapsedTimeSinceOrder;
    public final LocalTime timeLeftToOrder;
    public final List<Order> orders;
    public final TableStatus tableStatus;
    public final ShoppingCart shoppingCart;
    public final OrderData latestOrder;


    public TableData(int amountOfPeople, int tableNumber, LocalTime elapsedTimeSinceOrder, LocalTime timeLeftToOrder, List<Order> orders, TableStatus tableStatus, ShoppingCart shoppingCart) {
        this.amountOfPeople = amountOfPeople;
        this.tableNumber = tableNumber;
        this.elapsedTimeSinceOrder = elapsedTimeSinceOrder;
        this.timeLeftToOrder = timeLeftToOrder;
        this.orders = orders;
        this.tableStatus = tableStatus;
        this.shoppingCart = shoppingCart;
        this.latestOrder = new OrderData(tableNumber,orders.get(orders.size()-1).getTimeOfOrder(),orders.get(orders.size()-1).getPreperationStatus(),orders.get(orders.size()-1).getBarOrders(),orders.get(orders.size()-1).getFoodOrders(),orders.get(orders.size()-1).getId());
    }
}
