package com.infosupport.happ.application;

import com.infosupport.happ.application.dto.StockData;
import com.infosupport.happ.data.StockRepository;
import com.infosupport.happ.domain.Ingredient;
import com.infosupport.happ.domain.Stock;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StockService {
    private final StockRepository stockRepository;

    public StockService(StockRepository stockRepository) {
        this.stockRepository = stockRepository;
    }

    public StockData createStock(){
        stockRepository.save(new Stock(new ArrayList<>()));
        return new StockData(new ArrayList<>());
    }

    public StockData addNewIngredientToStock(Long id,String name, int amount){
        Stock stock=stockRepository.getById(id);
        stock.addNewIngredientToStock(new Ingredient(name,amount));
        stockRepository.save(stock);
        return new StockData(stock.getId(),stock.getIngredients());
    }

    public StockData updateStock(Long id, List<Ingredient> ingredients){
        Stock stock = stockRepository.getById(id);
        stock.updateStock(ingredients);
        stockRepository.save(stock);
        return new StockData(stock.getId(),stock.getIngredients());
    }

    public void deleteStock(Long id){
        stockRepository.delete(stockRepository.getById(id));
    }

    public StockData getStock(Long id){
        return new StockData(id,stockRepository.getById(id).getIngredients());
    }
}
