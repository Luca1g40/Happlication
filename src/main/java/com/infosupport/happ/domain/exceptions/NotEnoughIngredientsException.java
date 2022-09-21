package com.infosupport.happ.domain.exceptions;

public class NotEnoughIngredientsException extends RuntimeException {
    public NotEnoughIngredientsException(String ingredientName) {
        super("Insufficient amount of ingredient " + ingredientName);
    }

}
