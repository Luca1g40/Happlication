package com.infosupport.happ.application;

import com.infosupport.happ.application.dto.ProductData;
import com.infosupport.happ.data.ProductRepository;
import com.infosupport.happ.domain.Ingredient;
import com.infosupport.happ.domain.Product;
import com.infosupport.happ.domain.ProductCategory;
import com.infosupport.happ.domain.exceptions.ItemNotFound;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@SpringBootTest
public class ProductServiceTest {

    Product product;
    List<Ingredient> ingredientList;
    Ingredient ingredient;
    ProductService productService;
    ProductRepository productRepository;

    @BeforeEach
    void beforeEach() {
        productRepository = mock(ProductRepository.class);
        ingredientList = new ArrayList<>();
        ingredient = new Ingredient("gember", 10);
        ingredientList.add(ingredient);
        product = new Product("gember stukjes", ingredientList, ProductCategory.DESSERT, 39.99, "Stukjes gember");

        when(productRepository.getById(1L)).thenReturn(product);
        when(productRepository.existsById(1L)).thenReturn(true);

        productService = new ProductService(productRepository);
    }

    @Test
    void createProduct() {
        ProductData productData = productService.createProduct(product.getName(), product.getProductCategory(), product.getPrice(), product.getIngredients(), product.getDetails());

        assertNotNull(productData);

        assertEquals(product.getName(), productData.name);
        assertEquals(product.getIngredients(), productData.ingredientList);
        assertEquals(product.getProductCategory(), productData.productCategory);
        assertEquals(product.getPrice(), productData.price);
    }

    @Test
    void updateProduct() {
        ProductData productData = productService.updateProduct("T-bone steak", ProductCategory.MAIN_COURSE, 199.99, 1L, new ArrayList<>(), "Zeer goeie steek");

        assertEquals(199.99, productData.price);
        assertEquals("T-bone steak", productData.name);
        assertEquals(0, productData.ingredientList.size());
        assertEquals(ProductCategory.MAIN_COURSE, productData.productCategory);
        assertThrows(ItemNotFound.class, () -> productService.updateProduct("T-bone steak", ProductCategory.MAIN_COURSE, 199.99, 10L, new ArrayList<>(), "Matige Steak"));

    }

    @Test
    void productExists() {
        assertEquals(this.product, productService.getProduct(1L));
    }

}

