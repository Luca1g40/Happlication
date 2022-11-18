package com.infosupport.happ.presentation;

import com.infosupport.happ.application.ProductSubCategoryService;
import com.infosupport.happ.application.dto.ProductSubCategoryData;
import com.infosupport.happ.presentation.dto.ProductSubCategoryRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProductSubCategoryController {

    private final ProductSubCategoryService productSubCategoryService;

    public ProductSubCategoryController(ProductSubCategoryService productSubCategoryService) {
        this.productSubCategoryService = productSubCategoryService;
    }

    @GetMapping("productsubcategory/{id}")
    public ProductSubCategoryData getProductSubCategory(@PathVariable Long id){
        return productSubCategoryService.getProductSubCategory(id);
    }

    @PostMapping("ProductSubCategory")
    public ProductSubCategoryData createProductSubCategory(@RequestBody ProductSubCategoryRequest ProductSubCategoryRequest){
        return productSubCategoryService.createProductSubCategory(ProductSubCategoryRequest.name);
    }

    @GetMapping("ProductSubCategory/all")
    public List<ProductSubCategoryData> getAllProductSubCategory(){
        return productSubCategoryService.findAll();
    }
}
