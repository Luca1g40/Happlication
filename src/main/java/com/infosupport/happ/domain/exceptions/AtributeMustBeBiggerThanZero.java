package com.infosupport.happ.domain.exceptions;

public class AtributeMustBeBiggerThanZero extends RuntimeException{
    public AtributeMustBeBiggerThanZero(String className,String atributeName) {
        super(className+" "+ atributeName +" cannot be a negative number.");
    }
}
