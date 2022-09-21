package com.infosupport.happ.presentation.dto;

import com.infosupport.happ.domain.TableStatus;

public class TableRequest {
    public int amountOfPeople;
    public int tableNr;
    public TableStatus tableStatus;

    public TableRequest(int amountOfPeople, int tableNr, TableStatus tableStatus) {
        this.amountOfPeople = amountOfPeople;
        this.tableNr = tableNr;
        this.tableStatus = tableStatus;
    }
}
