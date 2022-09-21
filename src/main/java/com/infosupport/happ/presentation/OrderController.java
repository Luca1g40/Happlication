package com.infosupport.happ.presentation;

import com.infosupport.happ.application.OrderService;
import com.infosupport.happ.application.dto.OrderData;
import com.infosupport.happ.domain.Order;
import com.infosupport.happ.presentation.dto.OrderRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/happ")
public class OrderController {
    private OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/order")
    public OrderData createOrder(@RequestBody OrderRequest orderDTO) {
        return orderService.createOrder(orderDTO.tableId, orderDTO.status);
    }

    @GetMapping("/order/{id}")
    public Order getOrder(@PathVariable Long id){
        return orderService.getOrder(id);
    }
}
