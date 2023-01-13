package com.infosupport.happ.domain;

import com.infosupport.happ.domain.exceptions.AttributeMustBeBiggerThanZero;

import javax.persistence.*;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import static com.infosupport.happ.domain.ProductDestination.BAR_PRODUCT;

@Entity(name = "tafel")
public class Table {

    @Id
    @GeneratedValue
    private Long id;


    @OneToMany(cascade = CascadeType.ALL)
    private List<KitchenOrder> kitchenOrders;

    @OneToMany(cascade = CascadeType.ALL)
    private List<BarOrder> barOrders;

    private LocalTime elapsedTimeSinceOrder;
    private LocalTime timeLeftToOrder;
    private int amountOfPeople;
    @Column(unique = true)
    private int tableNumber;
    private TableStatus tableStatus;

    @OneToOne(cascade = CascadeType.ALL)
    private ShoppingCart shoppingCart;
    private boolean hulpNodig = false;

    //TODO GOOI ORDERS
    public Table(LocalTime elapsedTimeSinceOrder, LocalTime timeLeftToOrder, int amountOfPeople, int tableNumber, TableStatus tableStatus, ShoppingCart shoppingCart, boolean hulpNodig) {
        if (tableNumber < 0) {
            throw new AttributeMustBeBiggerThanZero(getClass().getSimpleName(), "table number");
        } else if (amountOfPeople < 0)
            throw new AttributeMustBeBiggerThanZero(getClass().getSimpleName(), "amount of people");


        this.kitchenOrders = new ArrayList<>();
        this.barOrders = new ArrayList<>();

        this.elapsedTimeSinceOrder = elapsedTimeSinceOrder;
        this.timeLeftToOrder = timeLeftToOrder;
        this.amountOfPeople = amountOfPeople;
        this.tableNumber = tableNumber;
        this.tableStatus = tableStatus;
        this.shoppingCart = shoppingCart;
        this.hulpNodig = hulpNodig;
    }

    public Table() {
    }

    public boolean isHulpNodig() {
        return hulpNodig;
    }

    public void setHulpNodig(boolean hulpNodig) {
        this.hulpNodig = hulpNodig;
    }

    public int getAmountOfPeople() {
        return amountOfPeople;
    }

    public int getTableNumber() {
        return tableNumber;
    }

    public LocalTime getElapsedTimeSinceOrder() {
        return elapsedTimeSinceOrder;
    }

    public LocalTime getTimeLeftToOrder() {
        return timeLeftToOrder;
    }

    public TableStatus getTableStatus() {
        return tableStatus;
    }

    private void addToOrders(Order order) {
        if (order instanceof KitchenOrder) {
            kitchenOrders.add((KitchenOrder) order);
        } else if (order instanceof BarOrder) {
            barOrders.add((BarOrder) order);
        }
    }

    public List<Order> getAllOrders() {
        List<Order> orders = new ArrayList<>();
        barOrders.forEach(e -> orders.add(e));

        kitchenOrders.forEach(e -> orders.add(e));

        return orders;
    }

    public List<KitchenOrder> getKitchenOrders() {
        return kitchenOrders;
    }

    public List<BarOrder> getBarOrders() {
        return barOrders;
    }

    //TODO meerdere producten verwijderen
    public void deleteFromShoppingCart(Product product) {
        shoppingCart.removeFromShoppingCart(product);
    }

    public void removeAllOccurancesOfAProuctFromShoppingcart(Product product) {
        shoppingCart.removeEveryOccurrencesOfAProduct(product);
    }

    public void addToShoppingCart(Product product, int amount) {
        for (int i = 0; i < amount; i++) {
            this.shoppingCart.addToShoppingCart(product);
        }
    }

    public Long getId() {
        return id;
    }

    public void editShoppingCart(List<Product> products) {
        shoppingCart.editShoppingCart(products);
    }

    public ShoppingCart getShoppingCart() {
        return shoppingCart;
    }

    public void placeOrder() {
        Order barOrder = new BarOrder(this);
        Order kitchenOrder = new KitchenOrder(this);


        for (Product product : shoppingCart.getProducts()) {
            if (product.getProductDestination() == BAR_PRODUCT) {
                barOrder.addToProducts(product);
            } else kitchenOrder.addToProducts(product);
        }

        if (!barOrder.getProducts().isEmpty()) {
            this.addToOrders(barOrder);
        }
        if (!kitchenOrder.getProducts().isEmpty()) {
            this.addToOrders(kitchenOrder);
        }

        shoppingCart.clearShoppingCart();
    }

    @Override
    public String toString() {
        return "Table{" +
                "kitchenOrders=" + kitchenOrders +
                ", barOrders=" + barOrders +
                ", tableStatus=" + tableStatus +
                ", shoppingCart=" + shoppingCart +
                '}';
    }
}
