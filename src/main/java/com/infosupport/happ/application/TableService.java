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
    private final ProductService productService;

    public TableService(TableRepository tableRepository, ProductService productService) {
        this.tableRepository = tableRepository;
        this.productService = productService;
    }

    public TableData createTable(int amountOfPeople, int tableNr, TableStatus tableStatus) {
        Table table = tableRepository.save(new Table(new ArrayList<>(), LocalTime.of(0, 0, 0),
                LocalTime.of(2, 0, 0), amountOfPeople, tableNr, tableStatus, new ShoppingCart()));
        return createTableData(table);
    }

    public Table getTable(Long tableId) {
        tableExists(tableId);
        return tableRepository.getById(tableId);
    }


    public TableData addToShoppingCart(Long tableId, Long productId) {
        tableExists(tableId);
        Table table = tableRepository.getById(tableId);
        table.addToShoppingCart(productService.getProduct(productId));
        tableRepository.save(table);
        return createTableData(table);
    }

    public void removeFromShoppingCart(Long tableId, Product product) {
        tableExists(tableId);
        Table table = tableRepository.getById(tableId);
        table.deleteFromShoppingCart(product);
        tableRepository.save(table);
        createTableData(table);
    }

    public TableData editShoppingCart(Long tableId, List<Product> products) {
        tableExists(tableId);
        Table table = tableRepository.getById(tableId);
        table.editShoppingCart(products);
        tableRepository.save(table);
        return createTableData(table);
    }

    public TableData placeOrder(Long tableId) {
        tableExists(tableId);
        Table table = tableRepository.getById(tableId);
        table.placeOrder();
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

