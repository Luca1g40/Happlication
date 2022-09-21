package com.infosupport.happ.domain;

import org.springframework.lang.NonNull;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import static com.infosupport.happ.domain.PreperationStatus.*;

@Entity(name = "customer_order")
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

    public Order(Table table, LocalDateTime timeOfOrder, ArrayList<Product> products) {
        this.table = table;
        this.timeOfOrder = timeOfOrder;
        this.preperationStatus = UNCLAIMED;
        this.products = products;
    }
    public Long getId() {return id;}

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

    public boolean checkIfAllProductsAreDone(){
        for(Product product : products){
            if (!product.isReady()) {
                return false;
            }
        }
        return true;
    }

    public void claimOrder(){
        if(this.preperationStatus == UNCLAIMED){
            this.preperationStatus = CLAIMED;
        }
    }

    public void setPreperationStatusToDone() {
        if (checkIfAllProductsAreDone()){
            this.preperationStatus = DONE;
        }
    }
}
