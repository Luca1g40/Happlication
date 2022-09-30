package com.infosupport.happ.application;
import com.infosupport.happ.data.OrderAssistant;

import com.infosupport.happ.application.dto.OrderData;
import com.infosupport.happ.data.OrderRepository;
import com.infosupport.happ.domain.*;
import com.infosupport.happ.domain.exceptions.ItemNotFound;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;


@Service
public class OrderService {

    private final OrderAssistant orderAssistant;
    private final OrderRepository orderRepository;
    private final TableService tableService;


    public OrderService(OrderRepository orderRepository, OrderAssistant orderAssistant, TableService tableService) {
        this.orderRepository = orderRepository;
        this.orderAssistant = orderAssistant;
        this.tableService = tableService;

    }

//    public OrderData createOrder(Long id) {
//
//        Table table = this.orderAssistant.getTable(id);
//        Order order = new Order(table, LocalDateTime.now(), table.getShoppingCart().getProducts());
//
//        this.orderRepository.save(order);
//        this.orderRepository.save(order);
//        table.placeOrder(order);
//        this.tableService.save(table);
//
//        return createOrderData(order);
//    }

    public OrderData claimOrder(Long staffId, Long orderId) {
        Staff staff = orderAssistant.getStaff(staffId);
        Order order = this.getOrder(orderId);

        staff.addOrder(order);
        order.claimOrder();

        orderRepository.save(order);

        return this.createOrderData(order);
    }


    public Order getOrder(Long id) {
        orderExists(id);
        return this.orderAssistant.getOrderById(id);
    }


    private void orderExists(Long id) {
        if (!orderAssistant.existsById(id)) {
            throw new ItemNotFound("order");
        }
    }


    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
    public OrderData createOrderData(Order order) {
        return new OrderData(order.getTableNr(),
                order.getTimeOfOrder(),
                order.getPreperationStatus(),
                order.getProducts(),
                order.getId());
    }
}
