package com.infosupport.happ.application;

import com.infosupport.happ.application.dto.StockData;
import com.infosupport.happ.application.dto.TableData;
import com.infosupport.happ.data.IngredientRepository;
import com.infosupport.happ.data.StockRepository;
import com.infosupport.happ.domain.Ingredient;
import com.infosupport.happ.domain.Stock;
import com.infosupport.happ.domain.Table;
import com.infosupport.happ.domain.exceptions.ItemNotFound;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StockService {
    private final StockRepository stockRepository;
    private final IngredientRepository ingredientRepository;

    public StockService(StockRepository stockRepository, IngredientRepository ingredientRepository) {
        this.stockRepository = stockRepository;
        this.ingredientRepository = ingredientRepository;
    }

    public StockData createStock() {
        Stock stock = new Stock();

        stockRepository.save(stock);

        return createStockData(stock);

    }

    public StockData addNewIngredientToStock(Long stockId, String name, int amount) {
        stockExists(stockId);
        Stock stock = stockRepository.getById(stockId);
        stock.addNewIngredientToStock(new Ingredient(name, amount));
        stockRepository.save(stock);

        return createStockData(stock);
    }

    public StockData removeIngredientFromStock(Long stockId, Long ingredientId){
        stockExists(stockId);

        Ingredient ingredient = ingredientRepository.getById(ingredientId);

        Stock stock = stockRepository.getById(stockId);

        stock.removeIngredients(ingredient);

        stockRepository.save(stock);

        return createStockData(stock);

    }

    public StockData updateStock(Long stockId, List<Ingredient> ingredients) {
        stockExists(stockId);
        Stock stock = stockRepository.getById(stockId);
        stock.updateStock(ingredients);
        stockRepository.save(stock);

        return createStockData(stock);
    }

    public void deleteStock(Long id) {
        stockExists(id);
        stockRepository.delete(stockRepository.getById(id));
    }

    public StockData getStock(Long stockId) {
        stockExists(stockId);
        Stock stock = stockRepository.getById(stockId);
        return createStockData(stock);
    }

    private void stockExists(Long id) {
        if (!stockRepository.existsById(id)) {
            throw new ItemNotFound("stock");
        }
    }
    public StockData createStockData(Stock stock) {
        return new StockData(
                stock.getIngredients()
        );
    }


}
