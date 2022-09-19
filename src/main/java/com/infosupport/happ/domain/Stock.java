package com.infosupport.happ.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
public class Stock {

    @Id
    @GeneratedValue
    private Long id;

    @OneToMany
    private List<Product> products;

    public Stock(List<Product> products) {
        this.products = products;
    }

    public Stock() {
    }

    public List<Product> getProducts() {
        return products;
    }

}
