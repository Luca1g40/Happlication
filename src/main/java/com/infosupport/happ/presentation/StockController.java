package com.infosupport.happ.presentation;

import com.infosupport.happ.application.StockService;
import com.infosupport.happ.application.dto.StockData;
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
    public StockData updateStock(@PathVariable Long id,@RequestBody StockData stockData){
        return stockService.updateStock(id,stockData.ingredients);
    }

    @DeleteMapping("/stock/{id}")
    public void deleteStock(@PathVariable Long id){
        stockService.deleteStock(id);
    }


}
