package com.infosupport.happ.presentation;

import com.infosupport.happ.application.ProductService;
import com.infosupport.happ.application.dto.ProductData;
import com.infosupport.happ.domain.Product;
import com.infosupport.happ.domain.exceptions.ItemNotFound;
import com.infosupport.happ.presentation.dto.ProductRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@RestController
@RequestMapping("/happ")
public final class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/product")
    private ProductData createNewProduct(@RequestBody ProductRequest productRequest) {
        try {
            return this.productService.createProduct(
                    productRequest.name,
                    productRequest.productCategoryName,
                    productRequest.price,
                    productRequest.ingredients,
                    productRequest.details,
                    productRequest.productDestination,
                    productRequest.productType);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping(value = "/image")
    public String uploadImage(@RequestParam MultipartFile file) {
//        Path fileNamePath = Paths.get(imageDirectory,
//                name.concat(".").concat(FilenameUtils.getExtension(file.getOriginalFilename())));
        System.out.println(file);
        try {
//            Files.write(fileNamePath, file.getBytes());
            System.out.println(file);
//            System.out.println(file);
            String path = System.getProperty("user.dir").concat("\\src\\frontend\\frontendhapp\\images");
            Files.copy(file.getInputStream(), Paths.get(path+ File.separator+file.getOriginalFilename()), StandardCopyOption.REPLACE_EXISTING);

            return "created";
        } catch (Exception ex) {
            return"Image is not uploaded";
        }
    }

    @GetMapping("/product/{id}")
    private ProductData getById(@PathVariable Long id) {
        try {
            return productService.createProductData(productService.getProduct(id));
        } catch (ItemNotFound itemNotFound) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, itemNotFound.getMessage());
        } catch (Exception exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, exception.getMessage());
        }
    }

    @GetMapping("/products/drinks")
    private List<ProductData> getAllDrinks(){
        return productService.findAlDrink();
    }

    @GetMapping("/products/foods")
    private List<ProductData> getAllFood(){
        return productService.findAllFood();
    }

    @GetMapping("/product/findall")
    private List<Product> findAll() {
        return productService.findAll();
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
                    productRequest.productCategoryName,
                    productRequest.price,
                    productId,
                    productRequest.ingredients,
                    productRequest.details
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
