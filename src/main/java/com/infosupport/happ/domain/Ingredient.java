package com.infosupport.happ.domain;

import com.infosupport.happ.domain.exceptions.AttributeMustBeBiggerThanZero;
import com.infosupport.happ.domain.exceptions.NotEnoughIngredientsException;

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
        checkIfEnteredAmountIsBiggerThanZero(amount);
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

    public void increaseAmount(int amount) {
        this.amount = this.amount + amount;
    }

    public void decreaseAmount(int amount) {
        if (this.amount - amount < 1) {
            throw new NotEnoughIngredientsException(this.name);
        }
        this.amount = this.amount - amount;
    }

    private void setName(String name) {
        this.name = name;
    }

    private void setAmount(int amount) {
        this.amount = amount;
    }

    public void updateIngredient(String name, int amount) {
        checkIfEnteredAmountIsBiggerThanZero(amount);
        this.setName(name);
        this.setAmount(amount);
    }

    public Long getId() {
        return id;
    }

    public void checkIfEnteredAmountIsBiggerThanZero(int amount) {
        if (amount < 0) throw new AttributeMustBeBiggerThanZero(getClass().getSimpleName(), "amount");
    }
}
