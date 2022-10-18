package com.infosupport.happ.application.dto;

import com.infosupport.happ.domain.Ingredient;
import com.infosupport.happ.domain.Product;
import com.infosupport.happ.domain.ProductCategory;

import java.util.ArrayList;
import java.util.List;

public class ShoppingCartData {
    public List<ProductData> productDataList;

    public ShoppingCartData(List<Product> productList) {
        productDataList = new ArrayList<>();

        for (Product product:productList) {
             productDataList.add(new ProductData(product.getId(), product.getName(), product.getProductCategory(),product.getPrice(),product.isReady(),product.getIngredients(),product.getDetails()));
        }
    }
}
