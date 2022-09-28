package com.infosupport.happ.application;


import com.infosupport.happ.application.dto.TableData;
import com.infosupport.happ.data.TableRepository;
import com.infosupport.happ.domain.*;
import com.infosupport.happ.domain.exceptions.ItemNotFound;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class TableService {
    private final TableRepository tableRepository;

    public TableService(TableRepository tableRepository) {
        this.tableRepository = tableRepository;
    }

    public TableData createTable(int amountOfPeople, int tableNr, TableStatus tableStatus) {
        Table table = tableRepository.save(new Table(new ArrayList<>(), LocalTime.of(0, 0, 0),
                LocalTime.of(2, 0, 0), amountOfPeople, tableNr, tableStatus, new ShoppingCart(new ArrayList<>())));
        return createTableData(table);
    }

    public Table getTable(Long id) {
        tableExists(id);
        return tableRepository.getById(id);
    }


    public TableData addToShoppingCart(Long tableId, Order order) {
        tableExists(tableId);
        Table table = tableRepository.getById(tableId);
        table.addToShoppingCart(order);
        tableRepository.save(table);
        return createTableData(table);
    }

    public TableData removeFromShoppingCart(Long tableId, Product product) {
        tableExists(tableId);
        Table table = tableRepository.getById(tableId);
        table.deleteFromShoppingCart(product);
        tableRepository.save(table);
        return createTableData(table);
    }

    public TableData editShoppingCart(Long tableId, List<Product> products) {
        tableExists(tableId);
        Table table = tableRepository.getById(tableId);
        table.editShoppingCart(products);
        tableRepository.save(table);
        return createTableData(table);
    }


    private void tableExists(Long id) {
        if (!tableRepository.existsById(id)) {
            throw new ItemNotFound("table");
        }
    }

    public TableData createTableData(Table table) {
        return new TableData(table.getAmountOfPeople(),
                table.getTableNumber(),
                table.getElapsedTimeSinceOrder(),
                table.getTimeLeftToOrder(),
                table.getOrders(),
                table.getTableStatus(),
                table.getShoppingCart());
    }


}
//TODO Table status is not set
