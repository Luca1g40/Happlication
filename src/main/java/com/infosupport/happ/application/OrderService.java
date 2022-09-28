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

    private OrderAssistant orderAssistant;
    private final OrderRepository orderRepository;
    private final TableService tableService;
    private final StaffService staffService;


    public OrderService(OrderRepository orderRepository, TableService tableService, StaffService staffService) {
        this.orderRepository = orderRepository;
        this.tableService = tableService;
        this.staffService = staffService;
    }

    public OrderData createOrder(Long id) {
        Table table = this.tableService.getTable(id);

        Order order = new Order(table, LocalDateTime.now(), table.getShoppingCart().getProducts());
        this.orderRepository.save(order);

        table.placeOrder(order);
        this.tableService.save(table);

        return createOrderData(order);
    }

    public OrderData claimOrder(Long staffId, Long orderId) {
        Staff staff = this.staffService.getStaff(staffId);
        Order order = this.orderRepository.getById(orderId);

        staff.addOrder(order);
        order.claimOrder();

        orderRepository.save(order);

        return this.createOrderData(order);
    }


    public Order getOrder(Long id) {
        orderExists(id);
        return this.orderRepository.getById(id);
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
