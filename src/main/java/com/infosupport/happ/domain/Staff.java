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

    public Staff() {
    }

    public Staff(int password, String name, ArrayList<Operation> operations, ArrayList<Order> orders) {
        this.password = password;
        this.name = name;
        this.operations = operations;
        this.orders = orders;
    }
}
