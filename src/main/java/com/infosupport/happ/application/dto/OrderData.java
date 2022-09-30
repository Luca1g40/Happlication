package com.infosupport.happ.application.dto;

import com.infosupport.happ.domain.PreperationStatus;
import com.infosupport.happ.domain.Product;

import java.time.LocalDateTime;
import java.util.List;

public class OrderData {
    public final Long id;
    public final int tableNr;
    public final LocalDateTime timeOfOrder;
    public final PreperationStatus preperationStatus;
    public final List<Product> drinkProducts;
    public final List<Product> foodProducts;

    public OrderData(int tableNr, LocalDateTime timeOfOrder, PreperationStatus preperationStatus, List<Product> drinkProducts, List<Product> foodProducts,Long id) {
        this.tableNr = tableNr;
        this.timeOfOrder = timeOfOrder;
        this.preperationStatus = preperationStatus;
        this.drinkProducts = drinkProducts;
        this.foodProducts = foodProducts;
        this.id = id;

    }
}
