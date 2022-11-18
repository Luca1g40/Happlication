package com.infosupport.happ.application;

import com.infosupport.happ.application.dto.ProductCategoryData;
import com.infosupport.happ.application.dto.ProductData;
import com.infosupport.happ.application.dto.ProductSubCategoryData;
import com.infosupport.happ.data.IngredientRepository;
import com.infosupport.happ.data.ProductCategoryRepository;
import com.infosupport.happ.data.ProductRepository;
import com.infosupport.happ.domain.*;
import com.infosupport.happ.domain.exceptions.ItemNotFound;
import com.infosupport.happ.presentation.dto.ProductCategoryRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final IngredientRepository ingredientRepository;
    private final ProductCategoryService productCategoryService;
    private final ProductSubCategoryService productSubCategoryService;

    public ProductService(ProductRepository productRepository, IngredientRepository ingredientRepository, ProductCategoryService productCategoryService, ProductSubCategoryService productSubCategoryService) {
        this.productRepository = productRepository;
        this.ingredientRepository = ingredientRepository;
        this.productCategoryService = productCategoryService;
        this.productSubCategoryService = productSubCategoryService;
    }

    public ProductData createProduct(String name, String productCategoryName, double price, List<String> ingredients, String details, ProductDestination productDestination, String productSubCategoryName,ProductType productType) {
        Product product = new Product(name, convertIngredientStringToIngredient(ingredients), productCategoryService.getProductCategoryByName(productCategoryName), price, details,productDestination,productSubCategoryService.getByName(productSubCategoryName), productType);
        productRepository.save(product);
        return createProductData(product);
    }

    public ProductData switchProductPrepStatus(Long id) {
        productExists(id);
        Product product = productRepository.getById(id);

        this.productRepository.save(product);
        return createProductData(product);
    }


    public ProductData updateProduct(String name, String productCategoryName, double price, Long id, List<String> ingredients, String details) {
        productExists(id);
        Product product = productRepository.getById(id);

        product.setName(name);
        product.setProductCategory(productCategoryService.getProductCategoryByName(productCategoryName));
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
                createProductCategoryData(product.getProductCategory()),
                product.getPrice(),
                product.getIngredients(),
                product.getDetails(),
                product.getProductDestination(),
                product.getProductType(),
                createProductSubCategoryData(product.getProductSubCategory())
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
    public ProductCategoryData createProductCategoryData(ProductCategory productCategory){
        return new ProductCategoryData(productCategory.getId(), productCategory.getName());
    }

    public ProductSubCategoryData createProductSubCategoryData(ProductSubCategory productSubCategory){
        return new ProductSubCategoryData(productSubCategory.getId(), productSubCategory.getName());
    }
    public List<Product> findAll() {
        return productRepository.findAll();
    }

//    public List<Product> findAllDrinks() {
//        List<Product> drinks = new ArrayList<>();
//        for (Product product : productRepository.findAll()) {
//            if (product.getProductCategory() == DRINKS) {
//                drinks.add(product);
//            }
//        }
//        return drinks;
//    }
//
//    public List<Product> findAllFood() {
//        List<Product> foods = new ArrayList<>();
//        for (Product product : productRepository.findAll()) {
//            if (product.getProductCategory() != DRINKS) {
//                foods.add(product);
//            }
//        }
//        return foods;
//    }
}
