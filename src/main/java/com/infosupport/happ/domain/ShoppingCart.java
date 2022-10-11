package com.infosupport.happ.domain;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.HashMap;


@Entity
public class ShoppingCart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany
    private List<Product> products;

    //HashMap<String, String> capitalCities = new HashMap<String, String>();
    public ShoppingCart() {
        this.products = new ArrayList<>();
    }

    public void editShoppingCart(List<Product> products) {
        this.products = products;
    }

    public void removeFromShoppingCart(Product product) {
        products.remove(product);
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void addToShoppingCart(Product product){
//        if (products.containsKey(product)){
//            products.replace(product, products.get(product)+amount);
//        }else products.put(product,amount);
        products.add(product);
    }

    public Long getId() {
        return id;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void clearShoppingCart() {
        products.clear();
    }
}
