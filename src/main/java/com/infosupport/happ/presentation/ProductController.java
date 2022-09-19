package com.infosupport.happ.presentation;

import com.infosupport.happ.application.ProductService;
import com.infosupport.happ.application.dto.ProductData;
import com.infosupport.happ.presentation.dto.ProductRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/happ")
public class ProductController {
    //TODO: Add error handling

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/product")
    private ProductData createNewProduct(@RequestBody ProductRequest productRequest) {
        return this.productService.createProduct(
                productRequest.name,
                productRequest.productCategory,
                productRequest.price);
    }

    @PutMapping("/product/{productid}")
    private ProductData updateProduct(@PathVariable ("productid")Long productId, @RequestBody ProductRequest productRequest) {
        return this.productService.updateProduct(
                productRequest.name,
                productRequest.productCategory,
                productRequest.price,
                productId
        );
    }

    @DeleteMapping("/product/{productid}")
    private void deleteProduct(@PathVariable("productid")Long productId ) {
        this.productService.deleteProduct(productId);
    }



}
