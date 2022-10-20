package com.infosupport.happ.application;

import com.infosupport.happ.application.dto.ProductData;
import com.infosupport.happ.data.ProductRepository;
import com.infosupport.happ.domain.Ingredient;
import com.infosupport.happ.domain.Product;
import com.infosupport.happ.domain.ProductCategory;
import com.infosupport.happ.domain.exceptions.ItemNotFound;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.infosupport.happ.domain.ProductCategory.DRINKS;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public ProductData createProduct(String name, ProductCategory productCategory, double price, List<Ingredient> ingredients, String details) {
        Product product = new Product(name, ingredients, productCategory, price, details);
        productRepository.save(product);
        return createProductData(product);
    }

    public ProductData switchProductPrepStatus(Long id) {
        productExists(id);
        Product product = productRepository.getById(id);

        this.productRepository.save(product);
        return createProductData(product);
    }


    public ProductData updateProduct(String name, ProductCategory productCategory, double price, Long id, List<Ingredient> ingredients, String details) {
        productExists(id);
        Product product = productRepository.getById(id);

        product.setName(name);
        product.setProductCategory(productCategory);
        product.setPrice(price);
        product.setIngredients(ingredients);
        product.setDetails(details);

        this.productRepository.save(product);

        return createProductData(product);
    }

    public void deleteProduct(Long id) {
        productExists(id);
        productRepository.deleteById(id);
    }

    public Product getProduct(Long id) {
        productExists(id);
        return this.productRepository.getById(id);
    }

    public ProductData createProductData(Product product) {
        return new ProductData(
                product.getId(),
                product.getName(),
                product.getProductCategory(),
                product.getPrice(),
                product.getIngredients(),
                product.getDetails()
        );
    }

    private void productExists(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ItemNotFound("product");
        }
    }

    public List<Product> findAll() {
        return productRepository.findAll();
    }

    public List<Product> findAllDrinks() {
        List<Product> drinks = new ArrayList<>();
        for (Product product : productRepository.findAll()) {
            if (product.getProductCategory() == DRINKS) {
                drinks.add(product);
            }
        }
        return drinks;
    }

    public List<Product> findAllFood() {
        List<Product> foods = new ArrayList<>();
        for (Product product : productRepository.findAll()) {
            if (product.getProductCategory() != DRINKS) {
                foods.add(product);
            }
        }
        return foods;
    }
}
