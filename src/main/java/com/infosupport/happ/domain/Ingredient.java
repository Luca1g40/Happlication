package com.infosupport.happ.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Ingredient {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private int amount;

    public Ingredient(String name, int amount) {
        this.name = name;
        this.amount = amount;
    }

    public Ingredient() {

    }

    public String getName() {
        return name;
    }

    public int getAmount() {
        return amount;
    }

    public void increaseAmount(int amount){
        this.amount=this.amount+amount;
    }

    //Exception maken zodat het niet negative mag worden
    public void decreaseAmount(int amount){
        this.amount = this.amount-amount;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public void updateIngredient(String name,int amount){
        this.setName(name);
        this.setAmount(amount);
    }

    public Long getId() {
        return id;
    }
}
