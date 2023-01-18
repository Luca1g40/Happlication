package com.infosupport.happ.data;

import com.infosupport.happ.domain.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
    ProductCategory getProductCategoryByName(String name);
}
