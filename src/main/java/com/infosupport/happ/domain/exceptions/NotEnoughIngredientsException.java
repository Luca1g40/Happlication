package com.infosupport.happ.domain.exceptions;

public class NotEnoughIngredientsException extends RuntimeException{
    public NotEnoughIngredientsException(String ingredientName) {
        super("Unsufficient amount of ingredient "+ingredientName);
    }

}
