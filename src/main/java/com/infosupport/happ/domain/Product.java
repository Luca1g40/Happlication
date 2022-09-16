package com.infosupport.happ.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Product {

    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private ProductCategory productCategory;
    private double price;

    public Product(String name, ProductCategory productCategory, double price) {
        this.name = name;
        this.productCategory = productCategory;
        this.price = price;
    }

    public Product() {
    }
}
