package com.infosupport.happ.application;

import com.infosupport.happ.application.dto.ProductData;
import com.infosupport.happ.data.ProductRepository;
import com.infosupport.happ.domain.Product;
import com.infosupport.happ.domain.ProductCategory;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public ProductData createProduct(String name, ProductCategory productCategory, double price){
        Product product = new Product(name, productCategory, price);
        productRepository.save(product);

        return createProductData(product);

    }


    public ProductData updateProduct(String name, ProductCategory productCategory, double price, Long id){
        Product product = this.getProduct(id);

        product.setName(name);
        product.setProductCategory(productCategory);
        product.setPrice(price);

        this.productRepository.save(product);

        return createProductData(product);
    }

    public void deleteProduct(Long id) {
        Product product = getProduct(id);

        productRepository.deleteById(id);

    }

    private  Product getProduct(Long id){
        return this.productRepository.findById(id).
                orElseThrow(); //TODO: add exception
    }

    private ProductData createProductData(Product product){
        return new ProductData(
                product.getName(),
                product.getProductCategory(),
                product.getPrice());
    }
}
