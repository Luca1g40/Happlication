package com.infosupport.happ.application.dto;

import com.infosupport.happ.domain.Ingredient;
import com.infosupport.happ.domain.ProductCategory;

import java.util.List;

public class ProductData {

    public final Long id;
    public final String name;
    public final ProductCategory productCategory;
    public final double price;
    public final boolean isReady;
    public final List<Ingredient> ingredientList;
    public final String details;

    public ProductData(Long id, String name, ProductCategory productCategory, double price, boolean isReady, List<Ingredient> ingredientList,String details) {
        this.id = id;
        this.name = name;
        this.productCategory = productCategory;
        this.price = price;
        this.isReady = isReady;
        this.ingredientList = ingredientList;
        this.details = details;
    }
}
