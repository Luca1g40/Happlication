package com.infosupport.happ.data;

import com.infosupport.happ.domain.Product;
import com.infosupport.happ.domain.ProductType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> getAllByProductType(ProductType productType);


}
