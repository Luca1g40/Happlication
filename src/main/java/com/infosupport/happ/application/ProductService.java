package com.infosupport.happ.application;

import com.infosupport.happ.application.dto.ProductData;
import com.infosupport.happ.data.ProductRepository;
import com.infosupport.happ.domain.Ingredient;
import com.infosupport.happ.domain.Product;
import com.infosupport.happ.domain.ProductCategory;
import com.infosupport.happ.domain.exceptions.ItemNotFound;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public ProductData createProduct(String name, ProductCategory productCategory, double price, List<Ingredient> ingredients) {
        Product product = new Product(name, ingredients, productCategory, price);
        productRepository.save(product);

        return createProductData(product);

    }

    public ProductData switchProductPrepStatus(Long id) {
        productExists(id);
        Product product = getProduct(id);
        product.switchReadyStatus();

        this.productRepository.save(product);
        return createProductData(product);
    }


    public ProductData updateProduct(String name, ProductCategory productCategory, double price, Long id, List<Ingredient> ingredients) {
        productExists(id);
        Product product = getProduct(id);

        product.setName(name);
        product.setProductCategory(productCategory);
        product.setPrice(price);
        product.setIngredients(ingredients);

        this.productRepository.save(product);

        return createProductData(product);
    }

    public void deleteProduct(Long id) {
        productExists(id);
        productRepository.deleteById(id);
    }

    private Product getProduct(Long id) {
        productExists(id);
        return this.productRepository.getById(id);
    }

    private ProductData createProductData(Product product) {
        return new ProductData(
                product.getName(),
                product.getProductCategory(),
                product.getPrice(),
                product.isReady());
    }

    private void productExists(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ItemNotFound("product");
        }
    }

}
