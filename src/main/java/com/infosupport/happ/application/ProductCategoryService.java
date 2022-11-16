package com.infosupport.happ.application;

import com.infosupport.happ.application.dto.ProductCategoryData;
import com.infosupport.happ.data.ProductCategoryRepository;
import com.infosupport.happ.data.ProductRepository;
import com.infosupport.happ.domain.ProductCategory;
import com.infosupport.happ.domain.exceptions.ItemNotFound;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductCategoryService {
    private ProductCategoryRepository productCategoryRepository;

    public ProductCategoryService(ProductCategoryRepository productCategoryRepository) {
        this.productCategoryRepository = productCategoryRepository;
    }



    public ProductCategoryData createProductCategory(String name){
        ProductCategory productCategory = productCategoryRepository.save(new ProductCategory(name));
        return new ProductCategoryData(productCategory.getId(),productCategory.getName());
    }

    public ProductCategoryData getProductCategory(Long id){
        productCategoryExists(id);
        return createProductCategoryData(productCategoryRepository.getById(id));
    }

    public ProductCategory getProductCategoryByName(String name){
        return productCategoryRepository.getProductCategoryByName(name);
    }

    public List<ProductCategoryData> findAll(){
        return createProductDataList(productCategoryRepository.findAll());
    }

    public List<ProductCategoryData> createProductDataList(List<ProductCategory> productCategories){
        List<ProductCategoryData> productCategoryDataList = new ArrayList<>();
        for (ProductCategory productCategory: productCategories) {
            productCategoryDataList.add( createProductCategoryData(productCategory));
        }
        return productCategoryDataList;
    }



    public ProductCategoryData createProductCategoryData(ProductCategory productCategory){
        return new ProductCategoryData(productCategory.getId(), productCategory.getName());
    }


    public void productCategoryExists(Long id) {
        if (!productCategoryRepository.existsById(id)) {
            throw new ItemNotFound(ProductCategory.class.getSimpleName());
        }
    }
}
