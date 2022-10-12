package com.infosupport.happ.application;

import com.infosupport.happ.application.dto.OrderData;
import com.infosupport.happ.data.OrderAssistant;
import com.infosupport.happ.data.OrderRepository;
import com.infosupport.happ.domain.Order;
import com.infosupport.happ.domain.Product;
import com.infosupport.happ.domain.Staff;
import com.infosupport.happ.domain.Table;
import com.infosupport.happ.domain.exceptions.ItemNotFound;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;


@Service
public class OrderService {

    private final OrderAssistant orderAssistant;
    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository, OrderAssistant orderAssistant) {
        this.orderAssistant = orderAssistant;
        this.orderRepository = orderRepository;
    }

    public OrderData createOrder(Long tableId, List<Product> productList) {

        Table table = this.orderAssistant.getTable(tableId);
        Order order = new Order(table, LocalDateTime.now(), productList);

        this.orderRepository.save(order);

        return createOrderData(order);
    }

    public OrderData claimOrder(Long staffId, Long orderId) {

        Staff staff = orderAssistant.getStaff(staffId);

        Order order = orderAssistant.getOrderById(orderId);

        staff.addOrder(order);
        order.claimOrder();

        orderRepository.save(order);

        return this.createOrderData(order);
    }

    public OrderData getOrder(Long id) {
        orderExists(id);
        Order order = this.orderRepository.getById(id);
        return createOrderData(order);
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
                order.getBarOrders(),
                order.getFoodOrders(),
                order.getId());
    }
}
