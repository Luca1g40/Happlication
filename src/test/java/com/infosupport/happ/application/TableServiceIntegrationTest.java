package com.infosupport.happ.application;

import com.infosupport.happ.data.ProductRepository;
import com.infosupport.happ.data.TableRepository;
import com.infosupport.happ.domain.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import static com.infosupport.happ.domain.ProductCategory.*;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.assertEquals;


@SpringBootTest
public class TableServiceIntegrationTest {

    private TableService tableService;
    private TableRepository tableRepository;
    private ProductService productService;


    @BeforeEach
    void beforeEach(){
        this.tableRepository = mock(TableRepository.class);
        this.productService = mock(ProductService.class);
        this.tableService = new TableService(tableRepository, productService);
    }

    @Test
    @DisplayName("products can be added to the shopping cart")
    void addProductsToShoppingCart(){

        Table table = new Table(new ArrayList<>(), LocalTime.now(), LocalTime.now(),
                4, 3, TableStatus.OCCUPIED, new ShoppingCart());

        Product product = new Product("kip",  new ArrayList<>(), STARTER, 12.50);


        when(tableRepository.existsById(anyLong())).thenReturn(true);
        when(tableRepository.getById(anyLong())).thenReturn(table);

        when(productService.getProduct(anyLong())).thenReturn(product);

        tableService.addToShoppingCart( 1L, 1L);
        assertEquals(tableService.getTable(1L).getShoppingCart().getProducts().size(), 1);
        assertEquals(List.of(product), tableService.getTable(1L).getShoppingCart().getProducts());


    }
}
