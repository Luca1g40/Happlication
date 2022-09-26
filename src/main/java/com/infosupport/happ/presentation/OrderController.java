package com.infosupport.happ.presentation;

import com.infosupport.happ.application.OrderService;
import com.infosupport.happ.application.dto.OrderData;
import com.infosupport.happ.domain.Order;
import com.infosupport.happ.domain.exceptions.ItemNotFound;
import com.infosupport.happ.presentation.dto.OrderRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/happ")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/order")
    public OrderData createOrder(@RequestBody OrderRequest orderRequest) {
        try{
            return orderService.createOrder(orderRequest.tableId, orderRequest.productList);
        }catch (ItemNotFound exception){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, exception.getMessage());
        }
    }

    @GetMapping("/order/{id}")
    public OrderData getOrder(@PathVariable Long id){
        try {
            return orderService.createOrderData(orderService.getOrder(id));
        }catch (ItemNotFound exception){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, exception.getMessage());
        }
    }

    @DeleteMapping("/order/{orderid}")
    private void deleteOrder(@PathVariable("orderid")Long orderId ) {
        this.orderService.deleteOrder(orderId);
    }
}
