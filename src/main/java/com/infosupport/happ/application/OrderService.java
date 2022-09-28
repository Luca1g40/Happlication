package com.infosupport.happ.application;

import com.infosupport.happ.application.dto.OrderData;
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

    public OrderData createOrder(Long id, List<Product> productList) {
        Table table = this.orderAssistant.getTable(id);
        Order order = new Order(table, LocalDateTime.now(), productList);

        this.orderRepository.save(order);

        return createOrderData(order);
    }

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
        if (!orderRepository.existsById(id)) {
            throw new ItemNotFound("order");
        }
    }


    private OrderData createOrderData(Order order) {
        return new OrderData(order.getTableNr(),
                order.getTimeOfOrder(),
                order.getPreperationStatus(),
                order.getProducts(),
                order.getId());
    }
}
