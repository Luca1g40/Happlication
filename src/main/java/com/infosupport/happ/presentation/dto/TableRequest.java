package com.infosupport.happ.presentation.dto;

public class TableRequest {
    public int amountOfPeople;
    public int tableNr;

    public TableRequest(int amountOfPeople, int tableNr) {
        this.amountOfPeople = amountOfPeople;
        this.tableNr = tableNr;
    }
}
