package com.infosupport.happ.application;

import com.infosupport.happ.application.dto.StockData;
import com.infosupport.happ.data.StockRepository;
import org.springframework.stereotype.Service;

@Service
public class StockService {
    private final StockRepository stockRepository;

    public StockService(StockRepository stockRepository) {
        this.stockRepository = stockRepository;
    }


}
