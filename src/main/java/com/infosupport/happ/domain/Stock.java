package com.infosupport.happ.domain;

import org.springframework.lang.NonNull;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

@Entity
public class Stock {

    @Id
    @GeneratedValue
    private Long id;

    @OneToMany
    @NonNull
    private List<Ingredient> ingredients;

    public Stock() {
        this.ingredients = new ArrayList<>();
    }

    public List<Ingredient> getIngredients() {
        return Collections.unmodifiableList(ingredients);
    }

    public void addNewIngredientToStock(@NonNull Ingredient ingredient) {
        ingredients.add(ingredient);
    }

    public void updateStock(@NonNull List<Ingredient> ingredients) {
        setIngredients(ingredients);
    }

    private void setIngredients(@NonNull List<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }

    public void removeIngredients(Ingredient ingredient){
        for (int i = 0; i < ingredients.size(); i++){
            if (Objects.equals(ingredients.get(i).getName(), ingredient.getName())){
                ingredients.remove(i);
            }
        }
    }

    public Long getId() {
        return id;
    }
}
