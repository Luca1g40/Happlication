package com.infosupport.happ.application;

import com.infosupport.happ.application.dto.OrderData;
import com.infosupport.happ.data.OrderAssistant;
import com.infosupport.happ.data.OrderRepository;
import com.infosupport.happ.domain.*;
import com.infosupport.happ.domain.exceptions.ItemNotFound;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import static com.infosupport.happ.domain.PreperationStatus.CLAIMED;
import static com.infosupport.happ.domain.PreperationStatus.UNCLAIMED;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class OrderServiceTest {

    private OrderService orderService;
    private OrderAssistant orderAssistant;
    private TableService tableService;
    private OrderRepository orderRepository;

    @BeforeEach
    void beforeEach() {
        this.orderRepository = mock(OrderRepository.class);
        this.orderAssistant = mock(OrderAssistant.class);
        this.tableService = mock(TableService.class);
        this.orderService = new OrderService(orderRepository, orderAssistant);

        Table table = new Table(LocalTime.now(), LocalTime.now(), 4, 3, TableStatus.OCCUPIED, new ShoppingCart(), false);
        Staff staff = new Staff(1, "staff");
        Product product = new Product();

        when(orderAssistant.getStaff(1L)).thenReturn(staff);
        when(orderAssistant.getTable(1L)).thenReturn(table);
        when(orderAssistant.existsById(1L)).thenReturn(true);

        Order order = new Order(orderAssistant.getTable(1L), LocalDateTime.now(), List.of(product));

        when(orderRepository.getById(1L)).thenReturn(order);
        when(orderAssistant.getOrderById(1L)).thenReturn(order);


    }

    @Test
    @DisplayName("Order can be created")
    void CreateNewOrder() {

        Product product = new Product();

        OrderData orderData = orderService.createOrder(1L, List.of(product));

        assertEquals(UNCLAIMED, orderData.preperationStatus);
    }

    @Test
    @DisplayName("Get an order")
    void getOrder() {


        OrderData orderData = orderService.getOrder(1L);

        assertNotNull(orderData);

        assertThrows(ItemNotFound.class, () -> orderService.getOrder(4L));

    }

    @Test
    @DisplayName("Ordered products are split in food and drinks")
    void orderSplitFoodDrinks() {

        Product drinkProduct = new Product("cola", new ArrayList<>(), ProductCategory.DRINKS, 5);
        Product foodProduct = new Product("Sushi Roll", new ArrayList<>(), ProductCategory.MAIN_COURSE, 5);
        Product foodProduct2 = new Product("Soup", new ArrayList<>(), ProductCategory.STARTER, 5);
        List products = List.of(drinkProduct, foodProduct, foodProduct2);


        OrderData orderData = orderService.createOrder(1L, products);

        assertEquals(1, orderData.drinkProducts.size());
        assertEquals(2, orderData.foodProducts.size());
    }

    @Test
    @DisplayName("Staff can claim an order")
    void claimOrder() {

        Product product = new Product();

        orderService.createOrder(1L, List.of(product));

        Staff staff = orderAssistant.getStaff(1L);

        OrderData orderData = orderService.claimOrder(1L, 1L);

        assertNotNull(orderData);
        assertEquals(CLAIMED, orderData.preperationStatus);
        assertEquals(List.of(product).size(), staff.getClaimedOrders().size());

    }

}