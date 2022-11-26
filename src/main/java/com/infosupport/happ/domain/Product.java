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

    private double price;

    private String details;

    @Enumerated(EnumType.STRING)
    private ProductDestination productDestination;

    private String imagePath;

    public Product(String name, List<Ingredient> ingredients, ProductCategory productCategory, double price, String details, ProductDestination productDestination,ProductType productType,String imagePath) {
        this.name = name;
        this.ingredients = ingredients;
        this.productCategory = productCategory;
        this.price = price;
        this.details = details;
        this.productDestination = productDestination;
        this.productType = productType;
        this.imagePath = imagePath;
    }

    public String getImagePath() {
        return imagePath;
    }

    public String getDetails() {
        return details;
    }


    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
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

    public void setProductType(ProductType productType) {
        this.productType = productType;
    }

    public void setProductDestination(ProductDestination productDestination) {
        this.productDestination = productDestination;
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
