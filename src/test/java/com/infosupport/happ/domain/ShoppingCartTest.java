package com.infosupport.happ.domain;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class ShoppingCartTest {
    ShoppingCart shoppingCart;
    List<Product> productList;
    Product product;
    HashMap<Product, Integer> productIntegerHashMap;


    @BeforeEach
    void beforeEach(){
        productIntegerHashMap = new HashMap<>();

        shoppingCart = new ShoppingCart();
       productList = new ArrayList<>();
       product = new Product();
    }

    @Test
    void addProduct(){
        shoppingCart.addToShoppingCart(product);
        assertEquals(1,shoppingCart.getProducts().size());
    }

    @Test
    void editProductList(){

        Product product = new Product();
        Product product2 = new Product();

        productList.add(product);
        productList.add(product2);

        productIntegerHashMap.put(product, 2);
        productIntegerHashMap.put(product2, 5);
        //shoppingCart.editShoppingCart(productList);
        assertEquals(shoppingCart.getProducts().size(), 2);
    }
}
