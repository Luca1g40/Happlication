package com.infosupport.happ.presentation;

import com.infosupport.happ.application.IngredientService;
import com.infosupport.happ.application.dto.IngredientData;
import com.infosupport.happ.domain.exceptions.ItemNotFound;
import com.infosupport.happ.presentation.dto.IngredientRequest;
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
    public IngredientData createIngredient(@RequestBody IngredientRequest ingredientRequest) {
        return ingredientService.createIngredient(ingredientRequest.name, ingredientRequest.amount);
    }

    @DeleteMapping("/ingredient/{id}")
    public void deleteIngredient(@PathVariable Long id) {
        try {
            ingredientService.deleteIngredient(id);
        } catch (ItemNotFound itemNotFound) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, itemNotFound.getMessage());
        } catch (Exception exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, exception.getMessage());
        }
    }

    @GetMapping("/ingredient/{id}")
    public IngredientData getById(@PathVariable Long id) {
        try {
            return ingredientService.getIngredientById(id);
        } catch (ItemNotFound itemNotFound) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, itemNotFound.getMessage());
        } catch (Exception exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, exception.getMessage());
        }
    }

    @PutMapping("/ingredient/{id}")
    public IngredientData upgradeIngredient(@PathVariable Long id, @RequestBody IngredientRequest ingredientRequest) {
        try {
            return ingredientService.updateIngredient(id, ingredientRequest.name, ingredientRequest.amount);
        } catch (ItemNotFound itemNotFound) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, itemNotFound.getMessage());
        } catch (Exception attributeMustBeBiggerThanZero) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, attributeMustBeBiggerThanZero.getMessage());
        }
    }


    public IngredientData increaseIngredientAmount(@PathVariable Long id, @RequestBody int amount) {
        return ingredientService.increaseIngredientAmount(id, amount);

    }

    public IngredientData decreaseIngredientAmount(@PathVariable Long id, @RequestBody int amount) {
        return ingredientService.decreaseIngredientAmount(id, amount);

    }
}
