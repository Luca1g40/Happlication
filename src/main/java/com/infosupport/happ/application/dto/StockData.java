package com.infosupport.happ.application.dto;

import com.infosupport.happ.domain.Ingredient;

import java.util.ArrayList;
import java.util.List;

public class StockData {
    public List<Ingredient> ingredients;


    public StockData(List<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }
}
