package com.infosupport.happ.presentation;

import com.infosupport.happ.application.ProductCategoryService;
import com.infosupport.happ.application.dto.ProductCategoryData;
import com.infosupport.happ.presentation.dto.ProductCategoryRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/happ")
public class ProductCategoryController {

    private ProductCategoryService productCategoryService;

    public ProductCategoryController(ProductCategoryService productCategoryService) {
        this.productCategoryService = productCategoryService;
    }

    @GetMapping("productcategory/{id}")
    public ProductCategoryData getProductCategory(@PathVariable Long id){
        return productCategoryService.getProductCategory(id);
    }

    @PostMapping("productcategory")
    public ProductCategoryData createProductCategory(@RequestBody ProductCategoryRequest productCategoryRequest){
        return productCategoryService.createProductCategory(productCategoryRequest.name);
    }

    @GetMapping("productcategory/all")
    public List<ProductCategoryData> getAllProductCategory(){
        return productCategoryService.findAll();
    }


}
