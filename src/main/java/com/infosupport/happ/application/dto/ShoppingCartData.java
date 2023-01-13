package com.infosupport.happ.application.dto;

import com.infosupport.happ.domain.Product;

import java.util.ArrayList;
import java.util.List;

public class ShoppingCartData {
    public List<ProductData> productDataList;

    public ShoppingCartData(List<Product> productList) {
        productDataList = new ArrayList<>();

        for (Product product : productList) {
            productDataList.add(new ProductData(product.getId(), product.getName(), product.getProductCategory().getName(), product.getPrice(), product.getIngredients(), product.getDetails(), product.getProductDestination(), product.getProductType(), product.getImagePath()));
        }
    }
}
