package com.infosupport.happ.domain;

import java.time.LocalDateTime;

public class Operation {

    private LocalDateTime timeOfOperation;
    private OperationType type;
    private String details;

    public Operation(LocalDateTime timeOfOperation, OperationType type, String details) {
        this.timeOfOperation = timeOfOperation;
        this.type = type;
        this.details = details;
    }
}
