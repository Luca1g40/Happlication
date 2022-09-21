package com.infosupport.happ.application;

import com.infosupport.happ.application.dto.OrderData;
import com.infosupport.happ.data.OrderRepository;
import com.infosupport.happ.domain.Order;
import com.infosupport.happ.domain.PreperationStatus;
import com.infosupport.happ.domain.Table;
import com.infosupport.happ.domain.exceptions.ItemNotFound;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Service
public class OrderService {
    private final OrderRepository orderRespository;
    private final TableService tableService;

    public OrderService(OrderRepository orderRespository, TableService tableService) {
        this.orderRespository = orderRespository;
        this.tableService = tableService;
    }

    public OrderData createOrder(Long id, PreperationStatus status){
        Table table = this.tableService.getTable(id);
        Order order = orderRespository.save(new Order(table, LocalDateTime.now(), status, new ArrayList<>()));
        return createOrderData(order);
    }

    public OrderData getOrder(Long id){
        if (!orderExists(id)){
            throw new ItemNotFound("order");
        }else {
            Order order = orderRespository.getById(id);
            return new OrderData(order.getTableNr(), order.getTimeOfOrder(), order.getPreperationStatus(), order.getProducts());
        }
    }

    public void deleteOrder(Long id) {
        orderRespository.deleteById(id);
    }

    private OrderData createOrderData(Order order){
        return new OrderData(order.getTableNr(),
                order.getTimeOfOrder(),
                order.getPreperationStatus(),
                order.getProducts());
    }

    private boolean orderExists(Long id){
        return orderRespository.existsById(id);
    }
}
