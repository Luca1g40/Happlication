package com.infosupport.happ.presentation.dto;

import com.infosupport.happ.domain.ProductDestination;

import java.util.List;

public class ProductRequest {
    public Long id;
    public String name;
    public Integer amount;
    public String productCategoryName;
    public double price;
    public List<String> ingredients;
    public String details;
    public ProductDestination productDestination;
    public String image;

}
