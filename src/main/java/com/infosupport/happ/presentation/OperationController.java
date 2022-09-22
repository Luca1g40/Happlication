package com.infosupport.happ.presentation;

import com.infosupport.happ.application.OperationService;
import com.infosupport.happ.application.dto.OperationData;
import com.infosupport.happ.domain.Operation;
import com.infosupport.happ.presentation.dto.OperationRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/happ")
public class OperationController {
    private OperationService operationService;

    public OperationController(OperationService operationService) {
        this.operationService = operationService;
    }

    @PostMapping("/operation")
    public OperationData createOperation(@RequestBody OperationRequest operationDTO) {
        return operationService.createOperation(operationDTO.operationType, operationDTO.details);
    }

    @GetMapping("/operation/{id}")
    public OperationData getOperation(@PathVariable Long id) {
        return operationService.createOperationData(operationService.getOperation(id));
    }
}
