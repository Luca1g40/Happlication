package com.infosupport.happ.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Staff {

    @Id
    @GeneratedValue
    private Long id;
    private int password;
    private String name;
    @OneToMany
    private List<Operation> operations;
    @OneToMany
    private List<Order> claimedOrders;
    @OneToMany
    private List<Area> area;


    public Staff() {
    }


    public Staff(int password, String name, List<Operation> operations, List<Order> claimedOrders, List<Area> area) {
        this.password = password;
        this.name = name;
        this.operations = operations;
        this.claimedOrders = claimedOrders;
        this.area = area;
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

    public List<Area> getArea() {
        return area;
    }

    public void addOrder(Order order) {

        this.claimedOrders.add(order);

    }

    public List<Order> getClaimedOrders() {
        return claimedOrders;
    }
}
