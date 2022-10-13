package com.infosupport.happ.application;


import com.infosupport.happ.application.dto.OrderData;
import com.infosupport.happ.application.dto.ShoppingCartData;
import com.infosupport.happ.application.dto.TableData;
import com.infosupport.happ.data.OrderRepository;
import com.infosupport.happ.data.TableRepository;
import com.infosupport.happ.domain.Product;
import com.infosupport.happ.domain.ShoppingCart;
import com.infosupport.happ.domain.Table;
import com.infosupport.happ.domain.TableStatus;
import com.infosupport.happ.domain.exceptions.ItemNotFound;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
public class TableService {
    private final TableRepository tableRepository;
    private final ProductService productService;
    private final OrderRepository orderRepository;

    public TableService(TableRepository tableRepository, ProductService productService, OrderRepository orderRepository) {
        this.tableRepository = tableRepository;
        this.productService = productService;
        this.orderRepository = orderRepository;

    }

    public TableData createTable(int amountOfPeople, int tableNr, TableStatus tableStatus) {
        LocalTime elapsedTime = LocalTime.of(0, 0, 0);
        LocalTime timeLeftToOrder = LocalTime.of(2, 0, 0);

        Table table = tableRepository.save(new Table(elapsedTime, timeLeftToOrder, amountOfPeople,
                tableNr, tableStatus, new ShoppingCart()));

        return createTableData(table);
    }


    public Table getTable(Long tableId) {
        tableExists(tableId);
        return tableRepository.getById(tableId);
    }

    public ShoppingCartData getTableShoppingCart(Long tableId){
        tableExists(tableId);
        return new ShoppingCartData(tableRepository.getById(tableId).getShoppingCart().getProducts());
    }


    public TableData addToShoppingCart(Long tableId, Long productId, int amount) {
        tableExists(tableId);
        Table table = tableRepository.getById(tableId);

        table.addToShoppingCart(productService.getProduct(productId),amount);
        tableRepository.save(table);
        return createTableData(table);
    }

    public TableData removeFromShoppingCart(Long tableId,Product product){
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

    public TableData placeOrder(Long tableId) {
        tableExists(tableId);
        Table table = tableRepository.getById(tableId);
        table.placeOrder();
        orderRepository.save(table.getLastOrder());
        tableRepository.save(table);
        return createTableData(table);
    }

    private void tableExists(Long id) {
        if (!tableRepository.existsById(id)) {
            throw new ItemNotFound("table");
        }
    }

    public void deleteTable(Long id) {
        tableRepository.deleteById(id);
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

