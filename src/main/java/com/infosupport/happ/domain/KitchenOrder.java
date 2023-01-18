package com.infosupport.happ.domain;

import javax.persistence.Entity;


@Entity
public class KitchenOrder extends Order {

    public KitchenOrder(Table table) {
        super(table);
    }

    public KitchenOrder() {
    }

}
