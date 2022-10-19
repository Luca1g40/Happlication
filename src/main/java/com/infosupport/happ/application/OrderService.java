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
import static com.infosupport.happ.domain.PreperationStatus.UNCLAIMED;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Service
public class OrderService {

    private final OrderAssistant orderAssistant;
    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository, OrderAssistant orderAssistant) {
        this.orderAssistant = orderAssistant;
        this.orderRepository = orderRepository;
    }

    public OrderData createOrder(Long tableId, List<Long> productList) {
        List<Product> products = new ArrayList<>();
        Table table = this.orderAssistant.getTable(tableId);
        for (Long id:productList ) {
            products.add(orderAssistant.getProductById(id));
        }
        System.out.println(table);

        Order order = new Order(table,  products);

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

    public List<OrderData> claimMultipleOrders(Long staffId, List<Long> orders) {
        List<OrderData> dataOrders = new ArrayList<>();
        for(Long orderId: orders){
            dataOrders.add(claimOrder(staffId, orderId));
        }
        return dataOrders;
    }

    public OrderData getOrder(Long id) {
        orderExists(id);
        Order order = this.orderRepository.getById(id);
        return createOrderData(order);
    }

    public List<OrderData> getAllOrders() {

        return convertToOrderDataList(orderRepository.findAll());

    }

    public List<OrderData> getAllUnclaimedOrders() {
        List<Order> unclaimedOrders = new ArrayList<>();
        for (Order order : orderRepository.findAll()){
            if (order.getPreperationStatus() == UNCLAIMED){
                unclaimedOrders.add(order);
            }
        }

        return convertToOrderDataList(unclaimedOrders);

    }

    private void orderExists(Long id) {
        if (!orderAssistant.existsById(id)) {
            throw new ItemNotFound("order");
        }
    }

    public List<OrderData> convertToOrderDataList(List<Order> orders) {
        List<OrderData> ordersData = new ArrayList<>();

        for (Order order : orders){
            ordersData.add(createOrderData(order));
        }

        return ordersData;
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
