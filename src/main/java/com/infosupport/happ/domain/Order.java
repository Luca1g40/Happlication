package com.infosupport.happ.domain;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.infosupport.happ.domain.PreperationStatus.*;

@Entity(name = "customer_order")
public class Order {
    @Id
    @GeneratedValue
    private Long id;
    @ManyToOne
    private Table table;
    private LocalDateTime timeOfOrder;
    private PreperationStatus preperationStatus;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Product> products;

    public Order() {
    }

    public Order(Table table, LocalDateTime timeOfOrder, List<Product> products) {
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");


        this.table = table;
        this.timeOfOrder = now;
        this.preperationStatus = UNCLAIMED;
        this.products = products;
    }

    public Long getId() {
        return id;
    }

    public int getTableNr() {
        return table.getTableNumber();
    }

    public LocalDateTime getTimeOfOrder() {
        return timeOfOrder;
    }

    public PreperationStatus getPreperationStatus() {
        return preperationStatus;
    }

    public List<Product> getProducts() {
        return products;
    }

    public boolean checkIfAllProductsAreDone() {
//        for (Product key : products.keySet()) {
//            if (!key.isReady()) return false;
//        }

        for (Product product : products) {
            if (!product.isReady()) {
                return false;
            }
        }
        return true;
    }

    public void claimOrder() {
        if (this.preperationStatus == UNCLAIMED) {
            this.preperationStatus = CLAIMED;
        }
    }

    public void setPreperationStatusToDone() {
        if (checkIfAllProductsAreDone()) {
            this.preperationStatus = DONE;
        }
    }

    public void addToProducts(Product product) {
//        if (products.containsKey(product)){
//            products.replace(product, products.get(product)+amount);
//        }else products.put(product,1);

        products.add(product);
    }

    public List<Product> getBarOrders() {
//        HashMap<Product,Integer> barOrders = new HashMap<>();
//
//        for (Map.Entry<Product, Integer> entry : products.entrySet()) {
//            if (entry.getKey().getProductCategory()==ProductCategory.DRINKS){
//                barOrders.put(entry.getKey(), entry.getValue());
//            }
//        }

        List<Product> barOrders = new ArrayList<>();
        for (Product product : products) {
            if (product.getProductCategory() == ProductCategory.DRINKS) {
                barOrders.add(product);
            }
        }
        return barOrders;
    }

    public List<Product> getFoodOrders() {
//        HashMap<Product,Integer> kitchenOrders = new HashMap<>();
//
//        for (Map.Entry<Product, Integer> entry : products.entrySet()) {
//            if (entry.getKey().getProductCategory()==ProductCategory.DRINKS){
//                kitchenOrders.put(entry.getKey(), entry.getValue());
//            }
//        }



        List<Product> kitchenOrders = new ArrayList<>();
        for (Product product : products) {
            if (product.getProductCategory() != ProductCategory.DRINKS) {
                kitchenOrders.add(product);
            }
        }
        return kitchenOrders;
    }


//    public HashMap<Product, Integer> getProductBasedOnCategory(ProductCategory productCategory){
//        HashMap<Product,Integer> productHashmap = new HashMap<>();
//        for (Map.Entry<Product, Integer> entry : products.entrySet()) {
//            if (entry.getKey().getProductCategory()==productCategory){
//                productHashmap.put(entry.getKey(), entry.getValue());
//            }
//        }
//        return productHashmap;
//    }
}
