package com.infosupport.happ.presentation.dto;

import com.infosupport.happ.domain.OperationType;

public class OperationRequest {
    public OperationType operationType;
    public String details;

    public OperationRequest(OperationType operationType, String details) {
        this.operationType = operationType;
        this.details = details;
    }
}
