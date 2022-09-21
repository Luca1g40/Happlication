package com.infosupport.happ.presentation;

import com.infosupport.happ.application.StockService;
import com.infosupport.happ.application.dto.IngredientData;
import com.infosupport.happ.application.dto.StockData;
import com.infosupport.happ.domain.exceptions.ItemNotFound;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/happ")
public class StockController {
    private final StockService stockService;

    public StockController(StockService stockService) {
        this.stockService = stockService;
    }

    @GetMapping("/stock/{id}")
    public StockData getStock(@PathVariable Long id){
        try{
            return stockService.getStock(id);
        }catch(ItemNotFound itemNotFound){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, itemNotFound.getMessage());
        }catch (Exception exception){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, exception.getMessage());
        }
    }

    @PostMapping("/stock")
    public StockData createStock(){
        return stockService.createStock();
    }

    @PutMapping("/stock/{id}")
    public StockData updateStock(@PathVariable Long id,@RequestBody StockData stockData){
        try{
            return stockService.updateStock(id,stockData.ingredients);
        }catch(ItemNotFound itemNotFound){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, itemNotFound.getMessage());
        }catch (Exception exception){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, exception.getMessage());
        }
    }

    @DeleteMapping("/stock/{id}")
    public void deleteStock(@PathVariable Long id){
        try{
            stockService.deleteStock(id);
        }catch(ItemNotFound itemNotFound){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, itemNotFound.getMessage());
        }catch (Exception exception){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, exception.getMessage());
        }
    }

    @PostMapping("/stock/{id}/stock")
    public StockData addIngredientToStock(@PathVariable Long id, @RequestBody IngredientData ingredientData){
        try{
            return stockService.addNewIngredientToStock(id,ingredientData.name,ingredientData.amount);
        }catch(ItemNotFound itemNotFound){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, itemNotFound.getMessage());
        }catch (Exception exception){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, exception.getMessage());
        }
    }
}
