package com.infosupport.happ.domain.exceptions;

public class ItemAlreadyExists extends RuntimeException {
    public ItemAlreadyExists(String className, String itemUniqueAttribute) {
        super("A " + className + " with the unique attribute of " + itemUniqueAttribute + " already exists.");
    }

}
