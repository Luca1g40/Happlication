package com.infosupport.happ.application.dto;

import com.infosupport.happ.domain.ProductCategory;

public class ProductData {

    public final String name;
    public final ProductCategory productCategory;
    public final double price;
    public final boolean isReady;

    public ProductData(String name, ProductCategory productCategory, double price, boolean isReady) {
        this.name = name;
        this.productCategory = productCategory;
        this.price = price;
        this.isReady = isReady;
    }
}
