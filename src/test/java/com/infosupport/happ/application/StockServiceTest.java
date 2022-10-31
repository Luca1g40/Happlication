package com.infosupport.happ.application;

import com.infosupport.happ.application.dto.StockData;
import com.infosupport.happ.data.IngredientRepository;
import com.infosupport.happ.data.StockRepository;
import com.infosupport.happ.domain.Ingredient;
import com.infosupport.happ.domain.Stock;
import com.infosupport.happ.domain.exceptions.ItemNotFound;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class StockServiceTest {

    private StockRepository stockRepository;
    private StockService stockService;
    private IngredientRepository ingredientRepository;

    private Stock stock;
    private Ingredient ingredient;

    @BeforeEach
    void beforeEach() {
        this.stockRepository = mock(StockRepository.class);
        this.ingredientRepository = mock(IngredientRepository.class);
        this.stockService = new StockService(stockRepository, ingredientRepository);
        this.stock = new Stock();
        this.ingredient = new Ingredient("Kip", 1);

        when(stockRepository.getById(1L)).thenReturn(stock);
        when(stockRepository.existsById(1L)).thenReturn(true);
        when(ingredientRepository.getById(1L)).thenReturn(ingredient);


    }

    @Test
    @DisplayName("Add new ingredient to stock")
    void addIngredientsToStock() {

        StockData stockData = stockService.addNewIngredientToStock(1L, "Kip", 1);

        assertEquals(1, stockData.ingredients.size());
        assertThrows(ItemNotFound.class, () -> stockService.addNewIngredientToStock(4L, "Error", 1));

    }

    @Test
    @DisplayName("Create new stock")
    void createStock() {

        StockData stockData = stockService.createStock();

        assertNotNull(stockData);
        assertEquals(0, stockData.ingredients.size());

    }

    @Test
    @DisplayName("Get stock")
    void getStock() {

        StockData stockData = stockService.getStock(1L);

        assertNotNull(stockData);
        assertEquals(0, stockData.ingredients.size());
        assertThrows(ItemNotFound.class, () -> stockService.getStock(4L));


    }

    @Test
    @DisplayName("Delete ingredients from stock")
    void deleteIngredient() {

        StockData stockData = stockService.addNewIngredientToStock(1L, "Kip", 1);

        assertEquals(1, stockData.ingredients.size());

        stockData = stockService.removeIngredientFromStock(1L, 1L);

        assertEquals(0, stockData.ingredients.size());
        assertThrows(ItemNotFound.class, () -> stockService.removeIngredientFromStock(4L, 1L));


    }

    @Test
    @DisplayName("update ingredients in stock")
    void updateIngredients() {

        Ingredient updateIngredient = new Ingredient("Vis", 1);

        stockService.addNewIngredientToStock(1L, "Kip", 1);

        Ingredient updateIngredient2 = new Ingredient("Kip", 5);


        StockData stockData = stockService.updateStock(1L, List.of(updateIngredient, updateIngredient2));

        assertEquals("Vis", stockData.ingredients.get(0).getName());
        assertEquals(5, stockData.ingredients.get(1).getAmount());
        assertThrows(ItemNotFound.class, () -> stockService.updateStock(4L, List.of(updateIngredient, updateIngredient2)));


    }

}
