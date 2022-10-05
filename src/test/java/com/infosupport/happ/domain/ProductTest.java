package com.infosupport.happ.domain;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;


import java.util.ArrayList;
import java.util.List;

public class ProductTest {

    Product product;
    Ingredient ingredient;
    List<Ingredient> ingredientList;

    @BeforeEach
    void beforeEach(){
        product = new Product();
        ingredient = new Ingredient();
        ingredientList = new ArrayList<>();
    }

    @Test
    void switchReadyStatus(){
        product.switchReadyStatus();
        assertTrue(product.isReady());
        product.switchReadyStatus();
        assertFalse(product.isReady());
    }
}
