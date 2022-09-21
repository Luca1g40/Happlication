package com.infosupport.happ.presentation;

import com.infosupport.happ.application.IngredientService;
import com.infosupport.happ.application.dto.IngredientData;
import com.infosupport.happ.domain.exceptions.AttributeMustBeBiggerThanZero;
import com.infosupport.happ.domain.exceptions.ItemNotFound;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/happ")
public class IngredientController {
    private final IngredientService ingredientService;

    public IngredientController(IngredientService ingredientService) {
        this.ingredientService = ingredientService;
    }

    @PostMapping("/ingredient")
    public IngredientData createIngredient(@RequestBody IngredientData ingredientData){
        return ingredientService.createIngredient(ingredientData.name, ingredientData.amount);
    }

    @DeleteMapping("/ingredient/{id}")
    public void deleteIngredient(@PathVariable Long id){
        try{
            ingredientService.deleteIngredient(id);
        }catch (ItemNotFound itemNotFound){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, itemNotFound.getMessage());
        }catch (Exception exception){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, exception.getMessage());
        }
    }

    @GetMapping("/ingredient/{id}")
    public IngredientData getById(@PathVariable Long id){
        try{
            return ingredientService.getIngredientById(id);
        }catch (ItemNotFound itemNotFound){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, itemNotFound.getMessage());
        }catch (Exception exception){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, exception.getMessage());
        }
    }

    @PutMapping("/ingredient/{id}")
    public IngredientData upgradeIngredient(@PathVariable Long id, @RequestBody IngredientData ingredientData){
        try{
            return ingredientService.updateIngredient(id,ingredientData.name,ingredientData.amount);
        }catch (ItemNotFound itemNotFound){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, itemNotFound.getMessage());
        }catch (AttributeMustBeBiggerThanZero attributeMustBeBiggerThanZero){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, attributeMustBeBiggerThanZero.getMessage());
        }catch (Exception exception){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, exception.getMessage());
        }
    }


    public IngredientData increaseIngredientAmount(@PathVariable Long id,@RequestBody int amount){
        return ingredientService.increaseIngredientAmount(id,amount);

    }
    public IngredientData decreaseIngredientAmount(@PathVariable Long id,@RequestBody int amount){
        return ingredientService.decreaseIngredientAmount(id,amount);

    }
}
