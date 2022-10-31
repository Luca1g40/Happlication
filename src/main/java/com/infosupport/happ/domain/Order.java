package com.infosupport.happ.domain;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static com.infosupport.happ.domain.PreperationStatus.*;

@MappedSuperclass
public class Order {
    @Id
    @GeneratedValue
    private Long id;
    @ManyToOne
    private Table table;
    private LocalDateTime timeOfOrder;
    @Enumerated(EnumType.STRING)
    private PreperationStatus preperationStatus;

    @ManyToMany
    private List<Product> products;

    public Order() {
    }

    public Order(Table table) {}
    public Table getTable() {
        return table;
    }

    public Order(Table table, LocalDateTime timeOfOrder, List<Product> products) {
        LocalDateTime now = LocalDateTime.now();

        this.table = table;
        this.timeOfOrder = now;
        this.preperationStatus = UNCLAIMED;
        this.products = new ArrayList<>();
    }

    public Long getId() {
        return id;
    }

    public int getTableNr() {
        return table.getTableNumber();
    }

    public LocalDateTime getTimeOfOrder() {
        return timeOfOrder;
    }

    public PreperationStatus getPreperationStatus() {
        return preperationStatus;
    }

    public List<Product> getProducts() {
        return products;
    }


    public void claimOrder() {
        if (this.preperationStatus == UNCLAIMED) {
            this.preperationStatus = CLAIMED;
        }
    }

    public void setPreparationStatusToDone() {
        this.preperationStatus = DONE;
    }

    public void addToProducts(Product product) {
        products.add(product);
    }

//    public List<Product> getBarOrders() {
//
//
//        List<Product> barOrders = new ArrayList<>();
//        for (Product product : products) {
//            if (product.getProductCategory() == ProductCategory.DRINKS) {
//                barOrders.add(product);
//            }
//        }
//        return barOrders;
//    }
//
//    public List<Product> getFoodOrders() {
//
//        List<Product> kitchenOrders = new ArrayList<>();
//        for (Product product : products) {
//            if (product.getProductCategory() != ProductCategory.DRINKS) {
//                kitchenOrders.add(product);
//            }
//        }
//        return kitchenOrders;
//    }

    @Override
    public String toString() {
        return "SingleOrder{" +
                "id=" + id +

                ", timeOfOrder=" + timeOfOrder +
                ", preperationStatus=" + preperationStatus +
                ", products=" + products +
                '}';
    }
}
