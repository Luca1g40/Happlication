package com.infosupport.happ.domain;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Order {
    @Id
    @GeneratedValue
    private Long id;
    @ManyToOne
    private Table table;
    private LocalDateTime timeOfOrder;
    private PreperationStatus preperationStatus;
    @OneToMany
    private List<Product> products;

    public Order() {
    }

    public Order(Table table, LocalDateTime timeOfOrder, PreperationStatus preperationStatus, ArrayList<Product> products) {
        this.table = table;
        this.timeOfOrder = timeOfOrder;
        this.preperationStatus = preperationStatus;
        this.products = products;
    }
}
