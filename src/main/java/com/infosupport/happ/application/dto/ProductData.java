package com.infosupport.happ.application.dto;

import com.infosupport.happ.domain.*;

import java.util.List;

public class ProductData {

    public final Long id;
    public final String name;
    public final String productCategoryName;
    public final double price;
    public final List<Ingredient> ingredientList;
    public final String details;
    public final ProductDestination productDestination;
    public final ProductType productType;
    public final String imagePath;

    public ProductData(Long id, String name, String productCategoryName, double price, List<Ingredient> ingredientList, String details, ProductDestination productDestination, ProductType productType,String imagePath) {
        this.id = id;
        this.name = name;
        this.productCategoryName = productCategoryName;
        this.price = price;
        this.ingredientList = ingredientList;
        this.details = details;
        this.productDestination = productDestination;
        this.productType = productType;
        this.imagePath = imagePath;
    }
}
