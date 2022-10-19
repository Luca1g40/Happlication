package com.infosupport.happ.domain;


import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import static com.infosupport.happ.domain.PreperationStatus.CLAIMED;

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
    private List<Order> claimedOrders;

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
        this.claimedOrders = new ArrayList<>();
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
        this.claimedOrders.add(order);
    }

    public List<Order> getClaimedAndFinishedOrders() {
        return claimedOrders;
    }

    public List<Order> getClaimedOrders() {
        List<Order> ordersNotFinished = new ArrayList<>();

        for (Order order : claimedOrders) {
            if (order.getPreperationStatus() == CLAIMED) {
                ordersNotFinished.add(order);
            }
        }

        return ordersNotFinished;
    }

}
