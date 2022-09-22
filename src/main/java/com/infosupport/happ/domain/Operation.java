package com.infosupport.happ.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
public class Operation {
    @Id
    @GeneratedValue
    private Long id;
    private LocalDateTime timeOfOperation;
    private OperationType type;
    private String details;

    public Operation() {
    }

    public Operation(LocalDateTime timeOfOperation, OperationType type, String details) {
        this.timeOfOperation = timeOfOperation;
        this.type = type;
        this.details = details;
    }

    public LocalDateTime getTimeOfOperation() {
        return timeOfOperation;
    }

    public OperationType getType() {
        return type;
    }

    public String getDetails() {
        return details;
    }
}
