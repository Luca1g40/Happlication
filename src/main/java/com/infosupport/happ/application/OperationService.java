package com.infosupport.happ.application;

import com.infosupport.happ.application.dto.OperationData;
import com.infosupport.happ.data.OperationRepository;
import com.infosupport.happ.domain.Operation;
import com.infosupport.happ.domain.OperationType;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class OperationService {
    private final OperationRepository operationRepository;

    public OperationService(OperationRepository operationRepository) {
        this.operationRepository = operationRepository;
    }

    public OperationData createOperation(OperationType operationType, String details) {
        Operation operation = this.operationRepository.save(new Operation(LocalDateTime.now(), operationType, details));
        return createOperationData(operation);
    }

    public Operation getOperation(Long id) {
        return this.operationRepository.findById(id).orElseThrow();
    }

    public OperationData createOperationData(Operation operation) {
        return new OperationData(
                operation.getTimeOfOperation(),
                operation.getType(),
                operation.getDetails()
        );
    }
}
