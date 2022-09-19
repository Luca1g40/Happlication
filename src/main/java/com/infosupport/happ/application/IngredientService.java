package com.infosupport.happ.application;

import com.infosupport.happ.application.dto.IngredientData;
import com.infosupport.happ.data.IngredientRepository;
import com.infosupport.happ.domain.Ingredient;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class IngredientService {
    private final IngredientRepository ingredientRepository;

    public IngredientService(IngredientRepository ingredientRepository) {
        this.ingredientRepository = ingredientRepository;
    }

    public List<IngredientData> findAll(){
        List<IngredientData> ingredientDataList=new ArrayList<>();
        for (Ingredient ingredient:ingredientRepository.findAll() ) {
            ingredientDataList.add(new IngredientData(ingredient.getId(),ingredient.getName(),ingredient.getAmount()));

        }
        return ingredientDataList ;
    }

    public IngredientData getIngredientById(Long id){
        Ingredient ingredient= ingredientRepository.getById(id);
        return new IngredientData(ingredient.getName(),ingredient.getAmount());
    }

    public IngredientData increaseIngredientAmount(Long id,int amount){
        Ingredient ingredient = ingredientRepository.getById(id);
        ingredient.increaseAmount(amount);
        ingredientRepository.save(ingredient);
        return new IngredientData(ingredient.getName(),ingredient.getAmount());
    }

    public IngredientData decreaseIngredientAmount(Long id, int amount){
        Ingredient ingredient = ingredientRepository.getById(id);
        ingredient.decreaseAmount(amount);
        ingredientRepository.save(ingredient);
        return new IngredientData(ingredient.getName(),ingredient.getAmount());
    }

    public IngredientData createIngredient(String name,int amount){
        ingredientRepository.save(new Ingredient(name,amount));
        return new IngredientData(name,amount);
    }

    public void deleteIngredient(Long id){
        ingredientRepository.delete(ingredientRepository.getById(id));
    }

    public IngredientData updateIngredient(Long id,String name,int amount){
        Ingredient ingredient=ingredientRepository.getById(id);
        ingredient.updateIngredient(name,amount);

        ingredientRepository.save(ingredient);
        return new IngredientData(id,ingredient.getName(),ingredient.getAmount());
    }


}
