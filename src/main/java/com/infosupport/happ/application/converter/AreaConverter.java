package com.infosupport.happ.application.converter;

import com.infosupport.happ.application.dto.*;
import com.infosupport.happ.domain.*;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class AreaConverter {

    public TableData createTableData(Table table) {
        return new TableData(
                table.getId(),
                table.getAmountOfPeople(),
                table.getTableNumber(),
                table.getElapsedTimeSinceOrder(),
                table.getLoginTime(),
                table.getTableStatus(),
                new ShoppingCartData(table.getShoppingCart().getProducts()),
                convertToKitchenOrderDataList(table.getKitchenOrders()),
                convertToBarOrderDataList(table.getBarOrders()),
                table.isHulpNodig());
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
        return new ProductData(product.getId(),product.getName(), product.getProductCategory().getName(),product.getPrice(),product.getIngredients(),product.getDetails(),product.getProductDestination(),product.getProductType(), product.getImagePath());

    }

    public List<OrderData> convertToBarOrderDataList(List<BarOrder> orders) {
        List<OrderData> ordersData = new ArrayList<>();

        for (BarOrder order : orders) {
            ordersData.add(createOrderData(order));
        }

        return ordersData;
    }

    public List<OrderData> convertToKitchenOrderDataList(List<KitchenOrder> orders) {
        List<OrderData> ordersData = new ArrayList<>();

        for (KitchenOrder order : orders) {
            ordersData.add(createOrderData(order));
        }

        return ordersData;
    }
}
