package com.infosupport.happ.application.dto;

import com.infosupport.happ.domain.Ingredient;
import com.infosupport.happ.domain.ProductCategory;

import java.util.List;

public class ProductData {

    public final String name;
    public final ProductCategory productCategory;
    public final double price;
    public final boolean isReady;
    public final List<Ingredient> ingredientList;

    public ProductData(String name, ProductCategory productCategory, double price, boolean isReady,List<Ingredient> ingredientList) {
        this.name = name;
        this.productCategory = productCategory;
        this.price = price;
        this.isReady = isReady;
        this.ingredientList = ingredientList;
    }
}
