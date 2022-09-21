package com.infosupport.happ.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
public class Product {

    @Id
    @GeneratedValue
    private Long id;
    private String name;

    @OneToMany
    private List<Ingredient> ingredients;

    private ProductCategory productCategory;
    private double price;

    private boolean isReady;

    public Product(String name, List<Ingredient> ingredients, ProductCategory productCategory, double price) {
        this.name = name;
        this.ingredients = ingredients;
        this.productCategory = productCategory;
        this.price = price;
        this.isReady = false;
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

    public void switchReadyStatus() {
        this.isReady = !this.isReady;
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

    public boolean isReady() {
        return isReady;
    }
}
