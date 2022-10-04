package com.infosupport.happ.application;

import com.infosupport.happ.data.OrderAssistant;
import com.infosupport.happ.data.OrderRepository;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;

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
}