package com.infosupport.happ.application.dto;

import com.infosupport.happ.domain.*;

import java.time.LocalTime;
import java.util.List;

public class TableData {
    public final Long id;
    public final int amountOfPeople;
    public final int tableNumber;
    public final LocalTime elapsedTimeSinceOrder;
    public final LocalTime timeLeftToOrder;
    public final TableStatus tableStatus;
    public final ShoppingCartData shoppingCart;
    public final List<OrderData> kitchenOrders;
    public final List<OrderData> barOrders;
    public final boolean isHulpNodig;


    public TableData(Long id, int amountOfPeople, int tableNumber, LocalTime elapsedTimeSinceOrder, LocalTime timeLeftToOrder,  TableStatus tableStatus, ShoppingCartData shoppingCartData, List<OrderData> kitchenOrders, List<OrderData> barOrders, boolean isHulpNodig) {
        this.id = id;
        this.amountOfPeople = amountOfPeople;
        this.tableNumber = tableNumber;
        this.elapsedTimeSinceOrder = elapsedTimeSinceOrder;
        this.timeLeftToOrder = timeLeftToOrder;

        this.tableStatus = tableStatus;
        this.shoppingCart = shoppingCartData;
        this.kitchenOrders = kitchenOrders;
        this.barOrders = barOrders;
        this.isHulpNodig = isHulpNodig;

    }


}
