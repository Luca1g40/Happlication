package com.infosupport.happ.presentation.dto;

import com.infosupport.happ.domain.Ingredient;
import com.infosupport.happ.domain.ProductCategory;
import com.infosupport.happ.domain.ProductDestination;

import java.util.List;

public class ProductRequest {
    public Long id;
    public String name;
    public Integer amount;
    public ProductCategory productCategory;
    public double price;
    public List<Ingredient> ingredients;
    public String details;
    public ProductDestination productDestination;

}
