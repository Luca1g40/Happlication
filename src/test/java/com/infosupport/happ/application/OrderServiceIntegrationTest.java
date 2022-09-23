//package com.infosupport.happ.application;
//
//import com.infosupport.happ.application.dto.OrderData;
//import com.infosupport.happ.data.TableRepository;
//import com.infosupport.happ.domain.Order;
//import com.infosupport.happ.domain.Product;
//import com.infosupport.happ.domain.Table;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import static org.junit.jupiter.api.Assertions.*;
//import static com.infosupport.happ.domain.PreperationStatus.*;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Optional;
//
//import static org.mockito.Mockito.when;
//
//@SpringBootTest
//public class OrderServiceIntegrationTest {
//
//    @Autowired
//    private OrderService orderService;
//    private TableRepository tableRepository;
//
//
//    @Test
//    @DisplayName("")
//    void CreateNewOrder() {
//        Table table = new Table();
//        Product product = new Product();
//        List<Product> products = new ArrayList<Product>() {{
//            add(product);}
//        };
//
//        when(tableRepository.findById(1L)).thenReturn(Optional.of(table));
//
//        OrderData orderData = orderService.createOrder(1L, products);
//
//        assertEquals(UNCLAIMED, orderData.preperationStatus);
//    }
//}