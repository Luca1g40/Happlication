package com.infosupport.happ.application;

import com.infosupport.happ.application.dto.*;
import com.infosupport.happ.data.TableRepository;
import com.infosupport.happ.domain.*;
import com.infosupport.happ.domain.exceptions.ItemNotFound;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class TableService {
    private final TableRepository tableRepository;
    private final ProductService productService;

    public TableService(TableRepository tableRepository, ProductService productService) {
        this.tableRepository = tableRepository;
        this.productService = productService;

    }

    public TableData createTable(int amountOfPeople, int tableNr, TableStatus tableStatus) {
        LocalTime elapsedTime = LocalTime.of(0, 0, 0);
        LocalTime timeLeftToOrder = LocalTime.of(2, 0, 0);

        Table table = tableRepository.save(new Table(elapsedTime, timeLeftToOrder, amountOfPeople,
                tableNr, tableStatus, new ShoppingCart(), false));

        return createTableData(table);
    }

    public TableData setBoolHulp(int tablenumber, boolean hulpNodig) {
        Table table = getTableByTableNumber(tablenumber);
        table.setHulpNodig(hulpNodig);
        return createTableData(table);
    }

    public Table getTable(Long tableId) {
        tableExists(tableId);
        return tableRepository.getById(tableId);
    }

    public Table getTableByTableNumber(int tableNumber){
        return tableRepository.getTableByTableNumber(tableNumber);
    }

    public Long getTableNumberByNumber(int tableNumber){
        if(tableRepository.getTableByTableNumber(tableNumber) != null){
            Table table = tableRepository.getTableByTableNumber(tableNumber);
            return table.getId();
        }
        return 0L;
    }

    public ShoppingCartData getTableShoppingCart(Long tableId) {
        tableExists(tableId);
        return new ShoppingCartData(tableRepository.getById(tableId).getShoppingCart().getProducts());
    }


    public TableData addToShoppingCart(Long tableId, Long productId, int amount) {
        tableExists(tableId);
        Table table = tableRepository.getById(tableId);

        table.addToShoppingCart(productService.getProduct(productId), amount);
        tableRepository.save(table);
        return createTableData(table);
    }

    public TableData removeFromShoppingCart(Long tableId, Long productId) {
        tableExists(tableId);
        Table table = tableRepository.getById(tableId);
        table.deleteFromShoppingCart(productService.getProduct(productId));
        System.out.println("came here");
        tableRepository.save(table);
        return createTableData(table);
    }

    public TableData editShoppingCart(Long tableId, List<Product> products) {
        tableExists(tableId);
        Table table = tableRepository.getById(tableId);
        table.editShoppingCart(products);
        tableRepository.save(table);
        return createTableData(table);
    }

    public TableData removeAllOccurancesOfAProductFromShoppingcart(Long tableId,Long productId){
        tableExists(tableId);
        Table table = tableRepository.getById(tableId);
        table.removeAllOccurancesOfAProuctFromShoppingcart(productService.getProduct(productId));
        tableRepository.save(table);
        return createTableData(table);
    }

    public TableData placeOrder(Long tableId) {
        tableExists(tableId);
        Table table = tableRepository.getById(tableId);
        table.placeOrder();
        tableRepository.save(table);
        return createTableData(table);
    }

    public List<TableData> getAllTables() {
        List<TableData> tableData = new ArrayList<>();
        for (Table table : tableRepository.findAll()) {
            tableData.add(createTableData(table));
        }
        return tableData;
    }

    private void tableExists(Long id) {
        if (!tableRepository.existsById(id)) {
            throw new ItemNotFound(Table.class.getSimpleName());
        }
    }

    public void deleteTable(Long id) {
        tableRepository.deleteById(id);
    }

    public TableData createTableData(Table table) {
        return new TableData(
                table.getId(),
                table.getAmountOfPeople(),
                table.getTableNumber(),
                table.getElapsedTimeSinceOrder(),
                table.getTimeLeftToOrder(),
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
        return new ProductData(product.getId(),product.getName(),product.getProductCategory().getName(),product.getPrice(),product.getIngredients(),product.getDetails(),product.getProductDestination(),product.getProductType(),product.getImagePath());
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

