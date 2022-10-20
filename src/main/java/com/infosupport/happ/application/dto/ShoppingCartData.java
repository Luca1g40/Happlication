package com.infosupport.happ.application.dto;

import com.infosupport.happ.domain.Product;

import java.util.List;

public class ShoppingCartData {
    public List<Product> productList;

    public ShoppingCartData(List<Product> productList) {
        this.productList = productList;
    }
}
