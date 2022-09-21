package com.infosupport.happ.domain.exceptions;

public class ItemNotFound extends RuntimeException {
    public ItemNotFound(String className) {
        super("A " + className + " with the given id cannot be found.");
    }
}
