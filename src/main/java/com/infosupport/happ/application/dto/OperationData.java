package com.infosupport.happ.application.dto;

import com.infosupport.happ.domain.OperationType;

import java.time.LocalDateTime;

public class OperationData {
    public final LocalDateTime timeOfOperation;
    public final OperationType operationType;
    public final String details;

    public OperationData(LocalDateTime timeOfOperation, OperationType operationType, String details) {
        this.timeOfOperation = timeOfOperation;
        this.operationType = operationType;
        this.details = details;
    }
}
