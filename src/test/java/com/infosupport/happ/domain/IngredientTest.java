package com.infosupport.happ.domain;

import com.infosupport.happ.domain.exceptions.AttributeMustBeBiggerThanZero;
import com.infosupport.happ.domain.exceptions.NotEnoughIngredientsException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class IngredientTest {

    Ingredient ingredient;

    @BeforeEach
    void beforeEach() {
        ingredient = new Ingredient("Kaas", 2);
    }

    @Test
    @DisplayName("change amount of ingredient")
    void changeAmount() {
        ingredient.increaseAmount(1);
        assertEquals(3, ingredient.getAmount());

        ingredient.decreaseAmount(2);
        assertEquals(1, ingredient.getAmount());
    }

    @Test
    @DisplayName("NotEnoughIngredientsException is thrown")
    void decreaseToMinus() {
        assertThrows(NotEnoughIngredientsException.class, () -> ingredient.decreaseAmount(5));
    }

    @Test
    @DisplayName("Update ingredient")
    void updateIngredient() {
        assertEquals(ingredient.getName(), "Kaas");
        ingredient.updateIngredient("Worst", 4);
        assertEquals(ingredient.getName(), "Worst");
    }

    @Test
    @DisplayName("Update ingredient with negative")
    void updateIngredientWithNegative() {
        assertThrows(AttributeMustBeBiggerThanZero.class, () -> ingredient.updateIngredient("Worst", -4));
    }
}
