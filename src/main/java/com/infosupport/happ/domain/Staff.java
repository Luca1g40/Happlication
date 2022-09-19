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
    private List<Order> orders;
    @OneToMany
    private List<Area> area;

    public Staff() {
    }
    public Staff(int password, String name, List<Operation> operations, List<Order> orders, List<Area> area) {
        this.password = password;
        this.name = name;
        this.operations = operations;
        this.orders = orders;
        this.area = area;
    }
}
