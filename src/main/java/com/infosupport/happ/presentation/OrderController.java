package com.infosupport.happ.presentation;

import com.infosupport.happ.application.OrderService;
import com.infosupport.happ.application.dto.OrderData;
import com.infosupport.happ.domain.exceptions.ItemNotFound;
import com.infosupport.happ.presentation.dto.OrderRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/happ")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

//    @PostMapping("/order")
//    public OrderData createOrder(@RequestBody OrderRequest orderRequest) {
//        try {
//            return orderService.createOrder(orderRequest.tableId, orderRequest.productList);
//        } catch (ItemNotFound exception) {
//            throw new ResponseStatusException(HttpStatus.NOT_FOUND, exception.getMessage());
//        }
//    }

    @PostMapping("/order/{orderid}")
    public OrderData orderIsDone(@PathVariable Long orderid) {
        try {
            return orderService.setStatusToDone(orderid);
        } catch (ItemNotFound exception) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, exception.getMessage());
        }
    }

    @GetMapping("/order/{id}/bar")
    public OrderData getBarOrder(@PathVariable Long id) {
        try {
            return orderService.getBarOrder(id);
        } catch (ItemNotFound exception) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, exception.getMessage());
        }
    }

    @GetMapping("/order/{id}/kitchen")
    public OrderData getKitchenOrder(@PathVariable Long id) {
        try {
            return orderService.getKitchenOrder(id);
        } catch (ItemNotFound exception) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, exception.getMessage());
        }
    }

    @DeleteMapping("/order/{orderid}/kitchen")
    private void deleteKitchenOrder(@PathVariable("orderid") Long orderId) {
        this.orderService.deleteKitchenOrder(orderId);
    }


    @DeleteMapping("/order/{orderid}/bar")
    private void deleteBarOrder(@PathVariable("orderid") Long orderId) {
        this.orderService.deleteBarOrder(orderId);
    }

    @GetMapping("/order/all")
    private List<OrderData> getAllOrders(){
        return this.orderService.getAllOrders();
    }

    @GetMapping("/order/bydate")
    private List<OrderData> getOrdersByDate(@RequestParam("firstDate") String firstDate, @RequestParam("secondDate") String secondDate){

        return this.orderService.getAllOrdersByDatePeriod(LocalDate.parse(firstDate), LocalDate.parse(secondDate));
    }

    @GetMapping("/orders/today")
    private List<OrderData> getOrdersOfToday(){
        return this.orderService.getAllOrdersOfToday();
    }
}
