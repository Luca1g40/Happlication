package com.infosupport.happ.application.dto;

import com.infosupport.happ.domain.PreperationStatus;
import com.infosupport.happ.domain.Product;

import java.time.LocalDateTime;
import java.util.List;

public class OrderData {
    public final int tableNr;
    public final LocalDateTime timeOfOrder;
    public final PreperationStatus preperationStatus;
    public final List<Product> products;

    public OrderData(int tableNr, LocalDateTime timeOfOrder, PreperationStatus preperationStatus, List<Product> products, Long id) {
        this.tableNr = tableNr;
        this.timeOfOrder = timeOfOrder;
        this.preperationStatus = preperationStatus;
        this.products = products;
    }
}
