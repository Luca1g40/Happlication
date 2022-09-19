package com.infosupport.happ.application.dto;

import com.infosupport.happ.domain.Ingredient;

import java.util.List;

public class StockData {
    public Long id;
    public List<Ingredient> ingredients;

    public StockData(List<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }

    public StockData(Long id, List<Ingredient> ingredients) {
        this.id = id;
        this.ingredients = ingredients;
    }
}
