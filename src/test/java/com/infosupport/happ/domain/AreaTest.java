package com.infosupport.happ.domain;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalTime;
import java.util.List;

import static com.infosupport.happ.domain.TableStatus.OCCUPIED;
import static org.junit.jupiter.api.Assertions.*;

public class AreaTest {
    Area area = new Area("areaNaam");
    Table table;
    ShoppingCart shoppingCart;


    @BeforeEach
    void beforeEach(){
        table = new Table(LocalTime.now(), LocalTime.now(), 5, 1, OCCUPIED, shoppingCart, false);
        shoppingCart = new ShoppingCart();

    }

    @Test
    @DisplayName("Getting the name of area")
    void getAreaName() {
        assertEquals("areaNaam", area.getName());
    }

    @Test
    @DisplayName("Adding table to area")
    void addTableToARea() {
        area.addTable(table);
        assertEquals(area.getTables().get(0).getTableNumber(), table.getTableNumber());
    }

    @Test
    @DisplayName("Deleteing table from area")
    void deleteTableFromArea() {
        area.addTable(table);
        area.deleteTable(table);
        assertEquals(List.of(), area.getTables());
    }
}
