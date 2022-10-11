package com.infosupport.happ.application.dto;

import com.infosupport.happ.domain.ProductCategory;

public class ProductData {

    public final Long id;
    public final String name;
    public final ProductCategory productCategory;
    public final double price;
    public final boolean isReady;

    public ProductData(Long id, String name, ProductCategory productCategory, double price, boolean isReady) {
        this.id = id;
        this.name = name;
        this.productCategory = productCategory;
        this.price = price;
        this.isReady = isReady;
    }
}
