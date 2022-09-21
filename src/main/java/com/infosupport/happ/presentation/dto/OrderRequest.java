package com.infosupport.happ.presentation.dto;

import com.infosupport.happ.domain.PreperationStatus;

public class OrderRequest {
    public Long tableId;
    public PreperationStatus status;
    
    public OrderRequest(Long tableId, PreperationStatus status) {
        this.tableId = tableId;
        this.status = status;
    }
}
