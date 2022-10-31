package com.infosupport.happ.domain;


import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import static com.infosupport.happ.domain.PreperationStatus.CLAIMED;
import static com.infosupport.happ.domain.PreperationStatus.DONE;

@Entity
public class Staff implements Serializable {

    @Id
    @GeneratedValue
    private Long id;
    private int password;
    private String name;
    @OneToMany
    private List<Operation> operations;

    @OneToMany
    private List<KitchenOrder> claimedKitchenOrders;

    @OneToMany
    private List<BarOrder> claimedBarOrders;

    @ManyToMany(mappedBy = "staffList")
    private List<Area> areas;

    @ElementCollection
    @Enumerated(EnumType.STRING)
    private List<Rights> rights;

    public Staff() {
    }

    public Staff(int password, String name, List<Rights> rights) {
        this.password = password;
        this.name = name;
        this.operations = new ArrayList<>();
        this.claimedKitchenOrders = new ArrayList<>();
        this.claimedBarOrders = new ArrayList<>();
        this.areas = new ArrayList<>();
        this.rights = rights;
    }

    public List<Rights> getRights() {
        return rights;
    }

    public Long getId() {
        return id;
    }

    public int getPassword() {
        return password;
    }

    public String getName() {
        return name;
    }

    public List<Operation> getOperations() {
        return operations;
    }


    public List<Area> getAreas() {
        return areas;
    }

    public void addOrder(Order order) {
        if (order instanceof KitchenOrder){
            claimedKitchenOrders.add((KitchenOrder) order);
        }else if (order instanceof BarOrder){
            claimedBarOrders.add((BarOrder) order);
        }
    }

    public List<Order> getClaimedAndFinishedOrders() {
       return getOrderBasedOnStatus(DONE);
    }

    private List<Order> getOrderBasedOnStatus(PreperationStatus preperationStatus){
        List<Order> orders = new ArrayList<>();

        for (Order order : claimedKitchenOrders) {
            if (order.getPreperationStatus() == preperationStatus) {
                orders.add(order);
            }
        }

        for (Order order : claimedBarOrders) {
            if (order.getPreperationStatus() == preperationStatus) {
                orders.add(order);
            }
        }

        return orders;
    }

    public List<Order> getClaimedOrders() {
      return getOrderBasedOnStatus(CLAIMED);
    }

}
