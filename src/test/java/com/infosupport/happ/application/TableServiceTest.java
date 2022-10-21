package com.infosupport.happ.application;

import com.infosupport.happ.application.dto.TableData;
import com.infosupport.happ.data.OrderRepository;
import com.infosupport.happ.data.TableRepository;
import com.infosupport.happ.domain.*;
import com.infosupport.happ.domain.exceptions.ItemNotFound;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import static com.infosupport.happ.domain.ProductCategory.MAIN_COURSE;
import static com.infosupport.happ.domain.ProductCategory.STARTER;
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
    private OrderRepository orderRepository;


    @BeforeEach
    void beforeEach() {
        this.tableRepository = mock(TableRepository.class);
        this.productService = mock(ProductService.class);
        this.orderRepository = mock(OrderRepository.class);
        this.tableService = new TableService(tableRepository, productService, orderRepository);
        this.productStarter = new Product("kip", new ArrayList<>(), STARTER, 12.50, "lekker vis",ProductDestination.KITCHEN_PRODUCT);
        this.productMain = new Product("vis", new ArrayList<>(), MAIN_COURSE, 7.50, "lekker kip", ProductDestination.KITCHEN_PRODUCT);

        this.table = new Table(LocalTime.now(), LocalTime.parse("02:00:00"),
                4, 3, TableStatus.OCCUPIED, new ShoppingCart());

        when(tableRepository.existsById(1L)).thenReturn(true);
        when(tableRepository.getById(1L)).thenReturn(table);

        when(productService.getProduct(anyLong())).thenReturn(productStarter);


    }

    @Test
    @DisplayName("products can be added to the shopping cart")
    void addProductsToShoppingCart() {
        assertThrows(ItemNotFound.class, () -> tableService.addToShoppingCart(4L, 1L, 4));
    }

    @Test
    @DisplayName("products can be removed from the shopping cart")
    void removeProductsFromShoppingCart() {
        tableService.addToShoppingCart(1L, 1L, 1);
        assertEquals(1, tableService.getTable(1L).getShoppingCart().getProducts().size());

        tableService.removeFromShoppingCart(1L, productStarter);

        assertEquals(0, tableService.getTable(1L).getShoppingCart().getProducts().size());
        assertEquals(List.of(), tableService.getTable(1L).getShoppingCart().getProducts());
        assertThrows(ItemNotFound.class, () -> tableService.removeFromShoppingCart(4L, productStarter));

    }

    @Test
    @DisplayName("products can be edited in the shopping cart")
    void editProductsInShoppingCart() {

        //assertEquals(List.of(productStarter), tableService.getTable(1L).getShoppingCart().getProducts());

        TableData tableData = tableService.editShoppingCart(1L, List.of(productMain));

        assertEquals(List.of(productMain), tableService.getTable(1L).getShoppingCart().getProducts());
        assertNotNull(tableData);
        assertThrows(ItemNotFound.class, () -> tableService.editShoppingCart(4L, List.of(productMain)));

    }


    @Test
    @DisplayName("Table does not exist")
    void tableUsedDoesNotExist() {

        assertThrows(ItemNotFound.class, () -> tableService.getTable(4L));

    }

    @Test
    @DisplayName("Table does exist")
    void tableUsedExists() {

        assertEquals(this.table, tableService.getTable(1L));

    }
}
