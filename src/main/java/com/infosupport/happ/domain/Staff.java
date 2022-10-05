package com.infosupport.happ.domain;


import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

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

    //mappedBy = "staffList"
    @ManyToMany(cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    }, fetch = FetchType.EAGER,
            mappedBy = "staffList")
    private List<Area> areas;

    public Staff() {
    }

    public Staff(int password, String name, List<Operation> operations, List<Order> claimedOrders, List<Area> areas) {
        this.password = password;
        this.name = name;
        this.operations = operations;
        this.claimedOrders = claimedOrders;
        this.areas = new ArrayList<>();
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

    public void addArea(Area area) {
        this.areas.add(area);
    }

    public List<Order> getClaimedOrders() {
        return claimedOrders;
    }

    public void deleteArea(Area area) {
        this.areas.remove(area);
    }

    public void editAreaList(List<Area> areaList) {
        this.areas = areaList;
    }
}
