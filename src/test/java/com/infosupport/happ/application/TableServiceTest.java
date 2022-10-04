package com.infosupport.happ.application;

import com.infosupport.happ.application.dto.TableData;
import com.infosupport.happ.data.TableRepository;
import com.infosupport.happ.domain.*;
import com.infosupport.happ.domain.exceptions.ItemNotFound;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import static com.infosupport.happ.domain.ProductCategory.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;


@SpringBootTest
public class TableServiceTest {

    private TableService tableService;
    private TableRepository tableRepository;
    private ProductService productService;
    private Product productStarter;
    private Product productMain;
    private Table table;


    @BeforeEach
    void beforeEach(){
        this.tableRepository = mock(TableRepository.class);
        this.productService = mock(ProductService.class);
        this.tableService = new TableService(tableRepository, productService);
        this.productStarter = new Product("kip",  new ArrayList<>(), STARTER, 12.50);
        this.productMain = new Product("vis",  new ArrayList<>(), MAIN_COURSE, 7.50);


        this.table = new Table(new ArrayList<>(), LocalTime.now(), LocalTime.parse("02:00:00"),
                4, 3, TableStatus.OCCUPIED, new ShoppingCart());

        when(tableRepository.existsById(1L)).thenReturn(true);
        when(tableRepository.getById(1L)).thenReturn(table);

        when(productService.getProduct(anyLong())).thenReturn(productStarter);

        tableService.addToShoppingCart( 1L, 1L);

    }

    @Test
    @DisplayName("products can be added to the shopping cart")
    void addProductsToShoppingCart(){
        assertEquals(1, tableService.getTable(1L).getShoppingCart().getProducts().size());
        assertEquals(List.of(productStarter), tableService.getTable(1L).getShoppingCart().getProducts());
    }

    @Test
    @DisplayName("products can be removed from the shopping cart")
    void removeProductsFromShoppingCart(){

        assertEquals(1, tableService.getTable(1L).getShoppingCart().getProducts().size());

        tableService.removeFromShoppingCart( 1L, productStarter);

        assertEquals(0, tableService.getTable(1L).getShoppingCart().getProducts().size());
        assertEquals(List.of(), tableService.getTable(1L).getShoppingCart().getProducts());
    }
    @Test
    @DisplayName("products can be edited in the shopping cart")
    void editProductsInShoppingCart(){

        assertEquals(List.of(productStarter), tableService.getTable(1L).getShoppingCart().getProducts());

        TableData tableData = tableService.editShoppingCart( 1L, List.of(productMain));

        assertEquals(List.of(productMain), tableService.getTable(1L).getShoppingCart().getProducts());
        assertNotNull(tableData);

    }
    @Test
    @DisplayName("Order can be placed")
    void placeOrder(){
        String str = "2022-01-01 22:22";
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        LocalDateTime dateTime = LocalDateTime.parse(str, formatter);

        assertEquals(1, tableService.getTable(1L).getShoppingCart().getProducts().size());

        TableData tableData = tableService.placeOrder(1L);

        Order order = new Order(this.table, tableService.getTable(1L).getLastOrder().getTimeOfOrder(), List.of(productStarter));

        assertEquals(0, tableService.getTable(1L).getShoppingCart().getProducts().size());

        assertEquals(order.getProducts(), tableService.getTable(1L).getLastOrder().getProducts());
        assertEquals(order.getBarOrders(), tableService.getTable(1L).getLastOrder().getBarOrders());
        assertEquals(order.getTableNr(), tableService.getTable(1L).getLastOrder().getTableNr());
        assertEquals(order.getTimeOfOrder(), tableService.getTable(1L).getLastOrder().getTimeOfOrder());
        assertEquals(order.getPreperationStatus(), tableService.getTable(1L).getLastOrder().getPreperationStatus());
        assertNotNull(tableData);
    }
    @Test
    @DisplayName("Table does not exist")
    void tableUsedDoesNotExist(){

        assertThrows(ItemNotFound.class, ()-> tableService.getTable(4L));

    }
    @Test
    @DisplayName("Table does exist")
    void tableUsedExists(){

        assertEquals(this.table, tableService.getTable(1L));

    }
}
