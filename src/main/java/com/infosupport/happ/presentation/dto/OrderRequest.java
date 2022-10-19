package com.infosupport.happ.presentation.dto;

import com.infosupport.happ.domain.PreperationStatus;

import java.util.List;

public class OrderRequest {
    public Long tableId;
    public PreperationStatus status;
    public List<Long> productList;
    public List<Long> selectedOrders;
}
