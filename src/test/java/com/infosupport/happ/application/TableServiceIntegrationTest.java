package com.infosupport.happ.application;

import com.infosupport.happ.data.TableRepository;
import com.infosupport.happ.domain.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.assertEquals;


@SpringBootTest
public class TableServiceIntegrationTest {

    private TableService tableService;
    private TableRepository tableRepository;


    @BeforeEach
    void beforeEach(){
        this.tableRepository = mock(TableRepository.class);
        this.tableService = new TableService(tableRepository);
    }

    @Test
    @DisplayName("products can be added to the shoppingcart")
    void addProductsToShoppingCart(){

        Table table = new Table(new ArrayList<>(), LocalTime.now(), LocalTime.now(),
                4, 3, TableStatus.OCCUPIED, new ShoppingCart());
        Order order = new Order(table, LocalDateTime.now(), new ArrayList<>());

        when(tableRepository.existsById(anyLong())).thenReturn(true);
        when(tableRepository.getById(anyLong())).thenReturn(table);

        assertEquals();
        tableService.addToShoppingCart(1L, order);
        assertEquals();


    }


}
