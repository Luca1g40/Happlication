package com.infosupport.happ.application;

import com.infosupport.happ.application.dto.StockData;
import com.infosupport.happ.data.IngredientRepository;
import com.infosupport.happ.data.StockRepository;
import com.infosupport.happ.domain.Ingredient;
import com.infosupport.happ.domain.Stock;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@SpringBootTest
public class StockServiceTest {

    private StockRepository stockRepository;
    private StockService stockService;
    private IngredientRepository ingredientRepository;

    private Stock stock;
    private Ingredient ingredient;

    @BeforeEach
    void beforeEach(){
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
    void addIngredientsToStock(){

        StockData stockData = stockService.addNewIngredientToStock(1L,  "Kip", 1);

        assertEquals(1, stockData.ingredients.size());

    }

    @Test
    @DisplayName("Delete ingredients from stock")
    void deleteIngredient(){
        StockData stockData = stockService.addNewIngredientToStock(1L,  "Kip", 1);

        assertEquals(1, stockData.ingredients.size());

        stockData = stockService.removeIngredientFromStock(1L, 1L);

        assertEquals(0, stockData.ingredients.size());


    }

}
