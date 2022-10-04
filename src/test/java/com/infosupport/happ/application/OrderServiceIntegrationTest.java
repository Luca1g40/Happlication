package com.infosupport.happ.application;

import com.infosupport.happ.application.dto.OrderData;
import com.infosupport.happ.data.OrderAssistant;
import com.infosupport.happ.data.OrderRepository;
import com.infosupport.happ.domain.Product;
import com.infosupport.happ.domain.ShoppingCart;
import com.infosupport.happ.domain.Table;
import com.infosupport.happ.domain.TableStatus;
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
public class OrderServiceIntegrationTest {

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

//    @Test
//    @DisplayName("Order can be created")
//    void CreateNewOrder() {
//
//        Table table = new Table(new ArrayList<>(), LocalTime.now(), LocalTime.now(), 4, 3, TableStatus.OCCUPIED, new ShoppingCart());
//        Product product = new Product();
//        List<Product> products = new ArrayList<Product>() {
//            {
//                add(product);
//            }
//        };
//        when(orderAssistant.getTable(anyLong())).thenReturn(table);
//        when(orderAssistant.existsById(anyLong())).thenReturn(true);
//
//        OrderData orderData = orderService.createOrder(1L);
//
//        assertEquals(UNCLAIMED, orderData.preperationStatus);
//    }
}