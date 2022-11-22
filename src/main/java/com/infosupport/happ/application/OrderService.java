package com.infosupport.happ.application;

import com.infosupport.happ.application.dto.OrderData;
import com.infosupport.happ.application.dto.ProductCategoryData;
import com.infosupport.happ.application.dto.ProductData;
import com.infosupport.happ.application.dto.ProductSubCategoryData;
import com.infosupport.happ.data.BarOrderRepository;
import com.infosupport.happ.data.KitchenOrderRepository;
import com.infosupport.happ.data.OrderAssistant;
import com.infosupport.happ.data.OrderRepository;
import com.infosupport.happ.domain.*;
import com.infosupport.happ.domain.exceptions.ItemNotFound;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static com.infosupport.happ.domain.PreperationStatus.UNCLAIMED;


@Service
public class OrderService {

    private final OrderAssistant orderAssistant;
    private final BarOrderRepository barOrderRepository;
    private final KitchenOrderRepository kitchenOrderRepository ;

    public OrderService(OrderAssistant orderAssistant, BarOrderRepository barOrderRepository, KitchenOrderRepository kitchenOrderRepository) {
        this.orderAssistant = orderAssistant;
        this.barOrderRepository = barOrderRepository;
        this.kitchenOrderRepository = kitchenOrderRepository;
    }

    public Order saveOrder(Order order){
        if (order instanceof BarOrder){
            return barOrderRepository.save((BarOrder) order);
        }else{
            return kitchenOrderRepository.save((KitchenOrder) order);
        }
    }


    public OrderData claimOrder(Long staffId, Long orderId) {
        System.out.println("here");

        Staff staff = orderAssistant.getStaff(staffId);

        Order order = orderAssistant.getOrderById(orderId);

        staff.addOrder(order);
        order.claimOrder();

        saveOrder(order);

        return this.createOrderData(order);

    }

    public OrderData setStatusToDone(Long orderId) {
        Order order = orderAssistant.getOrderById(orderId);

        order.setPreparationStatusToDone();

        saveOrder(order);

        return this.createOrderData(order);

    }

    public List<OrderData> claimMultipleOrders(Long staffId, List<Long> orders) {
        List<OrderData> dataOrders = new ArrayList<>();
        for (Long orderId : orders) {
            dataOrders.add(claimOrder(staffId, orderId));
        }
        return dataOrders;
    }

    public OrderData getBarOrder(Long orderId) {
        orderExists(orderId);
        BarOrder order = barOrderRepository.getById(orderId);
        return createOrderData(order);
    }

    public OrderData getKitchenOrder(Long orderId) {
        orderExists(orderId);
        KitchenOrder order = kitchenOrderRepository.getById(orderId);
        return createOrderData(order);
    }

    public List<OrderData> getAllOrders() {
        List<Order> orders = new ArrayList<>();
        orders.addAll(kitchenOrderRepository.findAll());
        orders.addAll(barOrderRepository.findAll());
        return convertToOrderDataList(orders);

    }

    public List<Order> getAllUnclaimedOrders() {
        List<Order> unclaimedOrders = new ArrayList<>();

        unclaimedOrders.addAll(barOrderRepository.getBarOrdersByPreperationStatus(UNCLAIMED));
        unclaimedOrders.addAll(kitchenOrderRepository.getKitchenOrdersByPreperationStatus(UNCLAIMED));

        return unclaimedOrders;
    }


    private void orderExists(Long id) {
        if (!orderAssistant.existsById(id)) {
            throw new ItemNotFound("order");
        }
    }

    public List<OrderData> convertToOrderDataList(List<Order> orders) {
        List<OrderData> ordersData = new ArrayList<>();

        for (Order order : orders) {
            ordersData.add(createOrderData(order));
        }

        return ordersData;
    }

    public void deleteBarOrder(Long orderId) {
        barOrderRepository.deleteById(orderId);
    }
    public void deleteKitchenOrder(Long orderId) {
        kitchenOrderRepository.deleteById(orderId);
    }


    public OrderData createOrderData(Order order) {
        return new OrderData(order.getTableNr(),
                order.getTimeOfOrder(),
                order.getPreperationStatus(),
                convertToProductDataList(order.getProducts()),
                order.getId());
    }

    public List<ProductData> convertToProductDataList(List<Product> products) {
        List<ProductData> productDataList = new ArrayList<>();

        for (Product product : products) {
            productDataList.add(createProductData(product));
        }

        return productDataList;
    }
    public ProductData createProductData(Product product) {
        return new ProductData(product.getId(),product.getName(),product.getProductCategory().getName(),product.getPrice(),product.getIngredients(),product.getDetails(),product.getProductDestination(),product.getProductType());
    }


}
