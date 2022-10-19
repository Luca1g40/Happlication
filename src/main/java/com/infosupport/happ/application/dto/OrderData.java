package com.infosupport.happ.application.dto;

import com.infosupport.happ.domain.PreperationStatus;
import com.infosupport.happ.domain.Product;

import java.time.LocalDateTime;
import java.util.List;

public class OrderData {
    public final Long id;
    public final int tableNr;
    public final String orderDate;
    public final String orderTime;
    public final PreperationStatus preperationStatus;
    public final List<Product> drinkProducts;
    public final List<Product> foodProducts;

    public OrderData(int tableNr, LocalDateTime timeOfOrder, PreperationStatus preperationStatus, List<Product> drinkProducts, List<Product> foodProducts, Long id) {
        this.tableNr = tableNr;
        this.orderDate = getOrderDateFormated(timeOfOrder);
        this.orderTime = getOrderTimeFormated(timeOfOrder);
        this.preperationStatus = preperationStatus;
        this.drinkProducts = drinkProducts;
        this.foodProducts = foodProducts;
        this.id = id;

    }

    public String getOrderTimeFormated(LocalDateTime timeOfOrder) {
        String orderTimeString;
        orderTimeString = (timeOfOrder.getHour() + ":" + timeOfOrder.getMinute());
        return orderTimeString;
    }

    public String getOrderDateFormated(LocalDateTime timeOfOrder) {
        String orderDateString;
        orderDateString = (timeOfOrder.getYear() + "-" + timeOfOrder.getMonthValue() + "-" + timeOfOrder.getDayOfMonth());
        return orderDateString;
    }
}
