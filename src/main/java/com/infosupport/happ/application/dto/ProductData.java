package com.infosupport.happ.application.dto;

import com.infosupport.happ.domain.*;

import java.util.List;

public class ProductData {

    public final Long id;
    public final String name;
    public final ProductCategoryData productCategoryData;
    public final double price;
    public final List<Ingredient> ingredientList;
    public final String details;
    public final ProductDestination productDestination;
    public final ProductType productType;
    public final String imagePath;

    public ProductData(Long id, String name, ProductCategoryData productCategoryData, double price, List<Ingredient> ingredientList, String details, ProductDestination productDestination, ProductType productType,String imagePath) {
        this.id = id;
        this.name = name;
        this.productCategoryData = productCategoryData;
        this.price = price;
        this.ingredientList = ingredientList;
        this.details = details;
        this.productDestination = productDestination;
        this.productType = productType;
        this.imagePath = imagePath;
    }
}
