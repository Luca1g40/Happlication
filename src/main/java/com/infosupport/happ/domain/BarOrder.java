package com.infosupport.happ.domain;

import javax.persistence.*;


@Entity
public class BarOrder extends Order{

    public BarOrder(Table table) {
        super(table);
    }

    public BarOrder() {

    }
}
