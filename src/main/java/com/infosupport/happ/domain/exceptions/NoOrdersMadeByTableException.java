package com.infosupport.happ.domain.exceptions;

public class NoOrdersMadeByTableException extends RuntimeException {
    public NoOrdersMadeByTableException() {
        super("Table does not have any orders");
    }
}
