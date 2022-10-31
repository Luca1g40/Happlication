package com.infosupport.happ.domain;

import org.junit.jupiter.api.BeforeEach;

import java.util.ArrayList;
import java.util.List;

public class ProductTest {

    Product product;
    Ingredient ingredient;
    List<Ingredient> ingredientList;

    @BeforeEach
    void beforeEach() {
        product = new Product();
        ingredient = new Ingredient();
        ingredientList = new ArrayList<>();
    }
}
