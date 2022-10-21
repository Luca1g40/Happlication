package com.infosupport.happ.application;

import com.infosupport.happ.application.dto.OrderData;
import com.infosupport.happ.data.BarOrderRepository;
import com.infosupport.happ.data.KitchenOrderRepository;
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

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@SpringBootTest
public class OrderServiceTest {

    private OrderService orderService;
    private OrderAssistant orderAssistant;
    private TableService tableService;
    private KitchenOrderRepository kitchenOrderRepository;
    private BarOrderRepository barOrderRepository;

    @BeforeEach
    void beforeEach() {
        this.barOrderRepository = mock(BarOrderRepository.class);
        this.kitchenOrderRepository = mock(KitchenOrderRepository.class);

        this.orderAssistant = mock(OrderAssistant.class);
        this.tableService = mock(TableService.class);

        this.orderService = new OrderService(orderAssistant,barOrderRepository,kitchenOrderRepository);

        Table table = new Table(LocalTime.now(), LocalTime.now(), 4, 3, TableStatus.OCCUPIED, new ShoppingCart());
        Staff staff = new Staff(1, "staff", new ArrayList<>());
        Product product = new Product();

        when(orderAssistant.getStaff(1L)).thenReturn(staff);
        when(orderAssistant.getTable(1L)).thenReturn(table);
        when(orderAssistant.existsById(1L)).thenReturn(true);

        Order order = new Order(orderAssistant.getTable(1L));




    }

//    @Test
//    @DisplayName("SingleOrder can be created")
//    void CreateNewOrder() {
//
//        Product product = new Product();
//
//        OrderData orderData = orderService.createOrder(1L, List.of(product));
//
//        assertEquals(UNCLAIMED, orderData.preperationStatus);
//    }


//    @Test
//    @DisplayName("Staff can claim an order")
//    void claimOrder() {
//
//        Product product = new Product();
//
//        orderService.createOrder(1L, List.of(product));
//
//        Staff staff = orderAssistant.getStaff(1L);
//
//        OrderData orderData = orderService.claimOrder(1L, 1L);
//
//        assertNotNull(orderData);
//        assertEquals(CLAIMED, orderData.preperationStatus);
//        assertEquals(List.of(product).size(), staff.getClaimedOrders().size());
//
//    }

}