package com.infosupport.happ.domain;

import javax.persistence.*;
import java.util.List;

@Entity
public class Product {

    @Id
    @GeneratedValue
    private Long id;
    private String name;

    @Enumerated(EnumType.STRING)
    private ProductType productType;

    @ManyToMany
    private List<Ingredient> ingredients;

    @ManyToOne
    private ProductCategory productCategory;

    @ManyToOne
    private ProductSubCategory productSubCategory;

    private double price;

    private String details;

    @Enumerated(EnumType.STRING)
    private ProductDestination productDestination;

    public Product(String name, List<Ingredient> ingredients, ProductCategory productCategory, double price, String details, ProductDestination productDestination,ProductSubCategory productSubCategory,ProductType productType) {
        this.name = name;
        this.ingredients = ingredients;
        this.productCategory = productCategory;
        this.price = price;
        this.details = details;
        this.productDestination = productDestination;
        this.productType = productType;
        this.productSubCategory = productSubCategory;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public List<Ingredient> getIngredients() {
        return ingredients;
    }

    public String getName() {
        return name;
    }

    public ProductCategory getProductCategory() {
        return productCategory;
    }

    public double getPrice() {
        return price;
    }

    public Product() {
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setProductCategory(ProductCategory productCategory) {
        this.productCategory = productCategory;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public void setIngredients(List<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }


    public Long getId() {
        return id;
    }

    public ProductDestination getProductDestination() {
        return productDestination;
    }

    public ProductType getProductType() {
        return productType;
    }

    public ProductSubCategory getProductSubCategory() {
        return productSubCategory;
    }

    @Override
    public String toString() {
        return "Product{" +
                "name='" + name + '\'' +
                ", productCategory=" + productCategory +
                ", productDestination=" + productDestination +
                '}';
    }
}
