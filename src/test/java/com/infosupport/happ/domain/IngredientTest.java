package com.infosupport.happ.domain;

import com.infosupport.happ.domain.exceptions.AttributeMustBeBiggerThanZero;
import com.infosupport.happ.domain.exceptions.NotEnoughIngredientsException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class IngredientTest {

    Ingredient ingredient;

    @BeforeEach
    void beforeEach() {
        this.ingredient = new Ingredient();
    }

    @Test
    @DisplayName("increase and decrease amount")
    void increaseAndDecrease(){
        ingredient.increaseAmount(2);
        assertEquals(2, ingredient.getAmount());
        ingredient.decreaseAmount(1);
        assertEquals(1, ingredient.getAmount());
    }

    @Test
    @DisplayName("decreaseAmount when null expect error")
    void decreaseAmountWhenNull(){
        assertThrows(NotEnoughIngredientsException.class, () -> this.ingredient.decreaseAmount(1));
    }

    @Test
    @DisplayName("Update a ingredient")
    void updateIngredient(){
        ingredient.updateIngredient("tomaat", 5);
        assertEquals(ingredient.getAmount(), 5);
        assertEquals(ingredient.getName(), "tomaat");
    }

    @Test
    @DisplayName("Update a ingredient with negative number")
    void updateIngredientWithNegative(){
        assertThrows(AttributeMustBeBiggerThanZero.class, () -> this.ingredient.updateIngredient("tomaat", -5));
    }
}
