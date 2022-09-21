package com.infosupport.happ.presentation;

import com.infosupport.happ.application.IngredientService;
import com.infosupport.happ.application.dto.IngredientData;
import com.infosupport.happ.presentation.dto.IngredientRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/happ")
public class IngredientController {
    private final IngredientService ingredientService;

    public IngredientController(IngredientService ingredientService) {
        this.ingredientService = ingredientService;
    }

    @PostMapping("/ingredient")
    public IngredientData createIngredient(@RequestBody IngredientRequest ingredientRequest){
        return ingredientService.createIngredient(ingredientRequest.name, ingredientRequest.amount);
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
    public IngredientData upgradeIngredient(@PathVariable Long id, @RequestBody IngredientRequest ingredientRequest){
        return ingredientService.updateIngredient(id,ingredientRequest.name,ingredientRequest.amount);
    }


    public IngredientData increaseIngredientAmount(@PathVariable Long id,@RequestBody int amount){
        return ingredientService.increaseIngredientAmount(id,amount);

    }
    public IngredientData decreaseIngredientAmount(@PathVariable Long id,@RequestBody int amount){
        return ingredientService.decreaseIngredientAmount(id,amount);

    }
}
