package com.infosupport.happ.application;

import com.infosupport.happ.application.dto.IngredientData;
import com.infosupport.happ.data.IngredientRepository;
import com.infosupport.happ.domain.Ingredient;
import com.infosupport.happ.domain.exceptions.ItemNotFound;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class IngredientServiceTest {

    private IngredientService ingredientService;
    private IngredientRepository ingredientRepository;


    @BeforeEach
    void beforeEach() {
        this.ingredientRepository = mock(IngredientRepository.class);
        this.ingredientService = new IngredientService(ingredientRepository);

        Ingredient ingredient = new Ingredient("Kaas", 5);

        List<Ingredient> ingredientDataList = new ArrayList<>();
        ingredientDataList.add(ingredient);

        when(ingredientRepository.existsById(2L)).thenReturn(true);
        when(ingredientRepository.getById(2L)).thenReturn(ingredient);
        when(ingredientRepository.findAll()).thenReturn(ingredientDataList);
    }

    @Test
    @DisplayName("Ingredient can be created")
    void createIngredient() {
        IngredientData ingredientData = ingredientService.createIngredient("Kaas", 5);
        assertNotNull(ingredientData);
        assertEquals("Kaas", ingredientData.name);
    }

    @Test
    @DisplayName("Update ingredient")
    void updateIngredient() {
        IngredientData ingredientData = ingredientService.updateIngredient(2L, "Worst", 4);
        assertNotNull(ingredientData);
        assertEquals("Worst", ingredientData.name);
        assertEquals(4, ingredientData.amount);
    }

    @Test
    @DisplayName("Get the correct ingredient")
    void getIngredient() {
        IngredientData ingredientData = ingredientService.getIngredientById(2L);
        assertEquals("Kaas", ingredientData.name);
    }

    @Test
    @DisplayName("Increase ingredient amount")
    void increaseIngredientAmount() {
        IngredientData ingredientData = ingredientService.increaseIngredientAmount(2L, 4);
        assertEquals(9, ingredientData.amount);
    }

    @Test
    @DisplayName("Decrease ingredient amount")
    void decreaseIngredientAmount() {
        IngredientData ingredientData = ingredientService.decreaseIngredientAmount(2L, 4);
        assertEquals(1, ingredientData.amount);
    }

    @Test
    @DisplayName("Ingredient does not exist")
    void ingredientDoesNotExist() {
        assertThrows(ItemNotFound.class, () -> ingredientService.getIngredientById(4L));
    }

    @Test
    @DisplayName("Find all ingredients")
    void findAllIngredients() {
        List<IngredientData> ingredientDataList = ingredientService.findAll();
        assertEquals(1, ingredientDataList.size());
        assertEquals("Kaas", ingredientDataList.get(0).name);
    }
}
