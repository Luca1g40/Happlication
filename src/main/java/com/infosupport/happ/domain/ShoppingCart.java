package com.infosupport.happ.domain;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.List;

@Entity
public class ShoppingCart {


    private Long id;

    private List<Product> products;

    public ShoppingCart(List<Product> products) {
        this.products = products;
    }

    public ShoppingCart() {

    }

    public void editShoppingCart(List<Product> products){
        this.products = products;
    }

    public void removeFromShoppingCart(Product product){
        products.remove(product);
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Id
    public Long getId() {
        return id;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void clearShoppingCart(){
        products.clear();
    }
}
