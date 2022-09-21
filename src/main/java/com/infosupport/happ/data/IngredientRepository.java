package com.infosupport.happ.data;

import com.infosupport.happ.domain.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IngredientRepository extends JpaRepository<Ingredient, Long> {
    Ingredient getIngredientByName(String name);

    boolean existsIngredientsByName(String name);
}
