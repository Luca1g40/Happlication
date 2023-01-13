package com.infosupport.happ.presentation.dto;

import com.infosupport.happ.domain.TableStatus;

import java.time.LocalTime;

public class TableRequest {
    public int amountOfPeople;
    public int tableNr;

    public LocalTime timeOfLogin;
    public TableStatus tableStatus;
    public boolean setHulpBool;
}
