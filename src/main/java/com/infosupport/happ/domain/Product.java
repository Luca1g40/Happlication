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

    public String getName() {
        return name;
    }

    public ProductCategory getProductCategory() {
        return productCategory;
    }

    public double getPrice() {
        return price;
    }

    public Product() {
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setProductCategory(ProductCategory productCategory) {
        this.productCategory = productCategory;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
