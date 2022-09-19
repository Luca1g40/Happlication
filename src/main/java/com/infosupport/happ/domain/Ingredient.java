package com.infosupport.happ.domain;

public class Ingredient {
    private Long id;
    private String naam;
    private int amount;

    public Ingredient(String naam, int amount) {
        this.naam = naam;
        this.amount = amount;
    }

    public String getNaam() {
        return naam;
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

    public void setNaam(String naam) {
        this.naam = naam;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public void updateIngredient(String name,int amount){
        this.setNaam(name);
        this.setAmount(amount);
    }
}
