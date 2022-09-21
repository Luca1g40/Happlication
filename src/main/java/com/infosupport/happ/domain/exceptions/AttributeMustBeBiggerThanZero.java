package com.infosupport.happ.domain.exceptions;

public class AttributeMustBeBiggerThanZero extends RuntimeException {
    public AttributeMustBeBiggerThanZero(String className, String attributeName) {
        super(className + " " + attributeName + " cannot be a negative number.");
    }
}
