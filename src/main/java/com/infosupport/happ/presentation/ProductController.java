package com.infosupport.happ.presentation;

import com.infosupport.happ.application.ProductService;
import com.infosupport.happ.application.dto.ProductData;
import com.infosupport.happ.domain.exceptions.ItemNotFound;
import com.infosupport.happ.presentation.dto.ProductRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/happ")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/product")
    private ProductData createNewProduct(@RequestBody ProductRequest productRequest) {
        try {
            return this.productService.createProduct(
                    productRequest.name,
                    productRequest.productCategory,
                    productRequest.price,
                    productRequest.ingredients);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/product/{productid}/prepstatus")
    private ProductData changePrepStatus(@PathVariable("productid") Long productId) {
        try {
            return this.productService.switchProductPrepStatus(productId);
        } catch (ItemNotFound e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/product/{productid}")
    private ProductData updateProduct(@PathVariable("productid") Long productId, @RequestBody ProductRequest productRequest) {
        try {
            return this.productService.updateProduct(
                    productRequest.name,
                    productRequest.productCategory,
                    productRequest.price,
                    productId,
                    productRequest.ingredients
            );
        } catch (ItemNotFound e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/product/{productid}")
    private void deleteProduct(@PathVariable("productid") Long productId) {
        try {
            this.productService.deleteProduct(productId);
        } catch (ItemNotFound e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
