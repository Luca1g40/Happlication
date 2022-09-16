package com.infosupport.happ.domain;

import java.time.LocalDateTime;
import java.util.ArrayList;

public class Order {

    private Table table;
    private LocalDateTime timeOfOrder;
    private PreperationStatus preperationStatus;
    private ArrayList<Product> products;


    public Order(Table table, LocalDateTime timeOfOrder, PreperationStatus preperationStatus, ArrayList<Product> products) {
        this.table = table;
        this.timeOfOrder = timeOfOrder;
        this.preperationStatus = preperationStatus;
        this.products = products;
    }
}
