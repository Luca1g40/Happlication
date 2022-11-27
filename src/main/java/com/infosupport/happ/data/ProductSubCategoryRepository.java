package com.infosupport.happ.data;

import com.infosupport.happ.domain.ProductSubCategory;
import com.infosupport.happ.domain.ShoppingCart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductSubCategoryRepository extends JpaRepository<ProductSubCategory, Long> {
    ProductSubCategory getProductSubCategoryByName(String name);
}
