package com.infosupport.happ.application;

import com.infosupport.happ.application.dto.ProductData;
import com.infosupport.happ.data.IngredientRepository;
import com.infosupport.happ.data.ProductRepository;
import com.infosupport.happ.domain.Ingredient;
import com.infosupport.happ.domain.Product;
import com.infosupport.happ.domain.ProductCategory;
import com.infosupport.happ.domain.ProductDestination;
import com.infosupport.happ.domain.exceptions.ItemNotFound;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.infosupport.happ.domain.ProductCategory.DRINKS;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final IngredientRepository ingredientRepository;

    public ProductService(ProductRepository productRepository,IngredientRepository ingredientRepository) {
        this.productRepository = productRepository;
        this.ingredientRepository = ingredientRepository;
    }

    //TODO give ingreedients id inplats van hele ingredient
    public ProductData createProduct(String name, ProductCategory productCategory, double price, List<String> ingredients, String details, ProductDestination productDestination) {

        Product product = new Product(name, convertIngredientStringToIngredient(ingredients), productCategory, price, details,productDestination);
        productRepository.save(product);
        return createProductData(product);
    }

    public ProductData switchProductPrepStatus(Long id) {
        productExists(id);
        Product product = productRepository.getById(id);

        this.productRepository.save(product);
        return createProductData(product);
    }


    public ProductData updateProduct(String name, ProductCategory productCategory, double price, Long id, List<String> ingredients, String details) {
        productExists(id);
        Product product = productRepository.getById(id);

        product.setName(name);
        product.setProductCategory(productCategory);
        product.setPrice(price);
        product.setIngredients(convertIngredientStringToIngredient(ingredients));
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
                product.getDetails(),
                product.getProductDestination()
        );
    }

    private void productExists(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ItemNotFound("product");
        }
    }

    private List<Ingredient> convertIngredientStringToIngredient(List<String> ingredientStringList){
        List<Ingredient> ingredientList = new ArrayList<>();
        for (String ingredient:ingredientStringList) {
            ingredientList.add(ingredientRepository.getIngredientByName(ingredient));
        }
        return ingredientList;
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
