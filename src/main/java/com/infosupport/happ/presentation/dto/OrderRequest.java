package com.infosupport.happ.presentation.dto;

import com.infosupport.happ.domain.PreperationStatus;
import com.infosupport.happ.domain.Product;

import java.util.List;

public class OrderRequest {
    public Long tableId;
    public PreperationStatus status;
    public List<Product> productList;
}
