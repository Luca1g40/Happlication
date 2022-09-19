package com.infosupport.happ.presentation;

import com.infosupport.happ.application.IngredientService;
import com.infosupport.happ.application.dto.IngredientData;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/happ")
public class IngredientController {
    private final IngredientService ingredientService;

    public IngredientController(IngredientService ingredientService) {
        this.ingredientService = ingredientService;
    }

    @PostMapping("/ingredient/{id}")
    public IngredientData createIngredient(@RequestBody IngredientData ingredientData){
        return ingredientService.createIngredient(ingredientData.name, ingredientData.amount);
    }

    @DeleteMapping("/ingredient/{id}")
    public void deleteIngredient(@PathVariable Long id){
        ingredientService.deleteIngredient(id);
    }

    @GetMapping("/ingredient/{id}")
    public IngredientData getById(@PathVariable Long id){
        return ingredientService.getIngredientById(id);
    }

    @PutMapping("/ingredient/{id}")
    public IngredientData upgradeIngredient(@PathVariable Long id, @RequestBody IngredientData ingredientData){
        return ingredientService.updateIngredient(id,ingredientData.name,ingredientData.amount);
    }


    public IngredientData increaseIngredientAmount(@PathVariable Long id,@RequestBody int amount){
        return ingredientService.increaseIngredientAmount(id,amount);

    }
    public IngredientData decreaseIngredientAmount(@PathVariable Long id,@RequestBody int amount){
        return ingredientService.decreaseIngredientAmount(id,amount);

    }
}
