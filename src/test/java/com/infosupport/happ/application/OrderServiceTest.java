package com.infosupport.happ.application;

import com.infosupport.happ.application.dto.OrderData;
import com.infosupport.happ.data.OrderAssistant;
import com.infosupport.happ.data.OrderRepository;
import com.infosupport.happ.domain.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import static com.infosupport.happ.domain.PreperationStatus.UNCLAIMED;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@SpringBootTest
public class OrderServiceTest {

    private OrderService orderService;
    private OrderAssistant orderAssistant;
    private TableService tableService;

    @BeforeEach
    void beforeEach() {
        OrderRepository orderRepository = mock(OrderRepository.class);
        this.orderAssistant = mock(OrderAssistant.class);
        this.tableService = mock(TableService.class);
        this.orderService = new OrderService(orderRepository, orderAssistant);

    }

    @Test
    @DisplayName("Order can be created")
    void CreateNewOrder() {

        Table table = new Table(new ArrayList<>(), LocalTime.now(), LocalTime.now(), 4, 3, TableStatus.OCCUPIED, new ShoppingCart());
        Product product = new Product();
        List<Product> products = new ArrayList<>() {
            {
                add(product);
            }
        };
        when(orderAssistant.getTable(anyLong())).thenReturn(table);
        when(orderAssistant.existsById(anyLong())).thenReturn(true);

        OrderData orderData = orderService.createOrder(1L, products);

        assertEquals(UNCLAIMED, orderData.preperationStatus);
    }

    @Test
    @DisplayName("Ordered products are split in food and drinks")
    void orderSplitFoodDrinks() {

        Table table = new Table(new ArrayList<>(), LocalTime.now(), LocalTime.now(), 4, 3, TableStatus.OCCUPIED, new ShoppingCart());
        Product drinkProduct = new Product("cola", new ArrayList<>() , ProductCategory.DRINKS,5);
        Product foodProduct = new Product("Sushi Roll", new ArrayList<>() , ProductCategory.MAIN_COURSE,5);
        Product foodProduct2 = new Product("Soup", new ArrayList<>() , ProductCategory.STARTER,5);
        List<Product> products = new ArrayList<>() {
            {
                add(drinkProduct);
                add(foodProduct);
                add(foodProduct2);
            }
        };

        when(orderAssistant.getTable(anyLong())).thenReturn(table);
        when(orderAssistant.existsById(anyLong())).thenReturn(true);

        OrderData orderData = orderService.createOrder(1L, products);

        assertEquals(1, orderData.drinkProducts.size());
        assertEquals(2, orderData.foodProducts.size());
    }
}