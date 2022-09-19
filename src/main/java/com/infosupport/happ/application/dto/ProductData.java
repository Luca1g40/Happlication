package com.infosupport.happ.application.dto;

import com.infosupport.happ.domain.ProductCategory;

public class ProductData {

    public final String name;
    public final ProductCategory productCategory;
    public final double price;

    public ProductData(String name, ProductCategory productCategory, double price) {
        this.name = name;
        this.productCategory = productCategory;
        this.price = price;
    }
}
