package com.infosupport.happ.domain;

import org.springframework.lang.NonNull;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "customer_order")
public class Order {
    @Id
    @GeneratedValue
    private Long id;
    @ManyToOne
    @NonNull
    private Table table;
    private LocalDateTime timeOfOrder;
    private PreperationStatus preperationStatus;
    @OneToMany
    private List<Product> products;

    public Order() {
    }

    public Order(@NonNull Table table, LocalDateTime timeOfOrder, PreperationStatus preperationStatus, ArrayList<Product> products) {
        this.table = table;
        this.timeOfOrder = timeOfOrder;
        this.preperationStatus = preperationStatus;
        this.products = products;
    }
}
