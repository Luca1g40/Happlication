package com.infosupport.happ.presentation;

import com.infosupport.happ.application.StockService;
import com.infosupport.happ.application.dto.IngredientData;
import com.infosupport.happ.application.dto.StockData;
import com.infosupport.happ.presentation.dto.IngredientRequest;
import com.infosupport.happ.presentation.dto.StockRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/happ")
public class StockController {
    private final StockService stockService;

    public StockController(StockService stockService) {
        this.stockService = stockService;
    }

    @GetMapping("/stock/{id}")
    public StockData getStock(@PathVariable Long id){
        return stockService.getStock(id);
    }

    @PostMapping("/stock")
    public StockData createStock(){
        return stockService.createStock();
    }

    @PutMapping("/stock/{id}")
    public StockData updateStock(@PathVariable Long id,@RequestBody StockRequest stockRequest){
        return stockService.updateStock(id,stockRequest.ingredients);
    }

    @DeleteMapping("/stock/{id}")
    public void deleteStock(@PathVariable Long id){
        stockService.deleteStock(id);
    }

    @PostMapping("/stock/{id}/stock")
    public StockData addIngredientToStock(@PathVariable Long id, @RequestBody IngredientRequest ingredientRequest){
        return stockService.addNewIngredientToStock(id,ingredientRequest.name,ingredientRequest.amount);
    }
}
