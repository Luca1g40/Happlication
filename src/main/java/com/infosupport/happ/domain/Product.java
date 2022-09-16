package com.infosupport.happ.domain;

import java.util.ArrayList;

public class Product {

    private String name;
    private ProductCategory productCategory;
    private double price;

    public Product(String name, ProductCategory productCategory, double price) {
        this.name = name;
        this.productCategory = productCategory;
        this.price = price;
    }
}
