package com.infosupport.happ.domain;

import java.util.ArrayList;

public class Staff {

    private int password;
    private String name;
    private ArrayList<Operation> operations;
    private ArrayList<Order> orders;

    public Staff(int password, String name, ArrayList<Operation> operations, ArrayList<Order> orders) {
        this.password = password;
        this.name = name;
        this.operations = operations;
        this.orders = orders;
    }
}
