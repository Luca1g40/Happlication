package com.infosupport.happ.domain.exceptions;

public class InvalidValueException extends RuntimeException {
    public InvalidValueException(String value) {
        super("incorrect input " + value);
    }
}