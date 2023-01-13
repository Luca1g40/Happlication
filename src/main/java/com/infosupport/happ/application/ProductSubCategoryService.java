package com.infosupport.happ.application;

import com.infosupport.happ.application.dto.ProductSubCategoryData;
import com.infosupport.happ.data.ProductSubCategoryRepository;
import com.infosupport.happ.domain.ProductSubCategory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductSubCategoryService {
    private final ProductSubCategoryRepository productSubCategoryRepository;

    public ProductSubCategoryService(ProductSubCategoryRepository productSubCategoryRepository) {
        this.productSubCategoryRepository = productSubCategoryRepository;
    }

    public ProductSubCategory getByName(String name) {
        return productSubCategoryRepository.getProductSubCategoryByName(name);
    }

    public List<ProductSubCategoryData> findAll() {
        return createProductDataList(productSubCategoryRepository.findAll());
    }

    public ProductSubCategoryData getProductSubCategory(Long id) {
        return createProductSubCategoryData(productSubCategoryRepository.getById(id));
    }

    public List<ProductSubCategoryData> createProductDataList(List<ProductSubCategory> productSubCategories) {
        List<ProductSubCategoryData> productSubCategoryDataList = new ArrayList<>();
        for (ProductSubCategory productSubCategory : productSubCategories) {
            productSubCategoryDataList.add(createProductSubCategoryData(productSubCategory));
        }
        return productSubCategoryDataList;
    }

    public ProductSubCategoryData createProductSubCategoryData(ProductSubCategory productSubCategory) {
        return new ProductSubCategoryData(productSubCategory.getId(), productSubCategory.getName());
    }

    public ProductSubCategoryData createProductSubCategory(String name) {
        ProductSubCategory productCategory = productSubCategoryRepository.save(new ProductSubCategory(name));
        return new ProductSubCategoryData(productCategory.getId(), productCategory.getName());
    }

//    public ProductCategoryData getProductCategory(Long id){
//        productCategoryExists(id);
//        return createProductCategoryData(productCategoryRepository.getById(id));
//    }
}
