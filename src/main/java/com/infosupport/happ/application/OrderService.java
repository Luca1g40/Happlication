package com.infosupport.happ.application;

import com.infosupport.happ.application.dto.OrderData;
import com.infosupport.happ.data.OrderRepository;
import com.infosupport.happ.domain.*;
import com.infosupport.happ.domain.exceptions.ItemNotFound;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final TableService tableService;

    public OrderService(OrderRepository orderRespository, TableService tableService) {
        this.orderRepository = orderRespository;
        this.tableService = tableService;
    }

    public OrderData createOrder(Long id){
        Table table = this.tableService.getTable(id); //TODO: Exception geen bestaand id toevoegen
        Order order = orderRepository.save(new Order(table, LocalDateTime.now(), new ArrayList<>()));
        return createOrderData(order);
    }

    public OrderData claimOrder(Long staffId, Long orderId){
        Staff staff = StaffRepository.getStaff(staffId);
        Order order = getOrder(orderId);

        staff.addOrder(order);
        order.claimOrder();

        return this.createOrder(orderId);
    }


    private Order getOrder(Long id){
        orderExists(id);
        return this.orderRepository.getById(id);
    }

    private void orderExists(Long id) {
        if(!orderRepository.existsById(id)){
            throw new ItemNotFound("order");
        }
    }


    private OrderData createOrderData(Order order){
        return new OrderData(order.getTableNr(),
                order.getTimeOfOrder(),
                order.getPreperationStatus(),
                order.getProducts(),
                order.getId());
    }
}
