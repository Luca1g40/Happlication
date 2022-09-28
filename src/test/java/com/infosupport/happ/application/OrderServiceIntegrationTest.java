package com.infosupport.happ.application;

import com.infosupport.happ.application.dto.OrderData;
import com.infosupport.happ.data.OrderAssistant;
import com.infosupport.happ.data.OrderRepository;
import com.infosupport.happ.data.TableRepository;
import com.infosupport.happ.domain.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static com.infosupport.happ.domain.PreperationStatus.*;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@SpringBootTest
public class OrderServiceIntegrationTest {

    private OrderService orderService;
    private OrderAssistant orderAssistant;
    private OrderRepository orderRepository;

    @BeforeEach
    void beforeEach(){
        this.orderRepository = mock(OrderRepository.class);
        this.orderAssistant = mock(OrderAssistant.class);
        this.orderService = new OrderService(orderRepository, orderAssistant);
    }

    @Test
    @DisplayName("Order can be created")
    void CreateNewOrder() {

        Table table = new Table(new ArrayList<>(), LocalTime.now(), LocalTime.now(), 4, 3, TableStatus.OCCUPIED, new ShoppingCart());
        Product product = new Product();
        List<Product> products = new ArrayList<Product>() {{
            add(product);}
        };

        when(orderAssistant.getTable(anyLong())).thenReturn(table);
        when(orderAssistant.existsById(anyLong())).thenReturn(true);

        OrderData orderData = orderService.createOrder(1L, products);

        assertEquals(UNCLAIMED, orderData.preperationStatus);
    }
}