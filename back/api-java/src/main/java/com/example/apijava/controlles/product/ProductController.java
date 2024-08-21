package com.example.apijava.controlles.product;

import com.example.apijava.utils.response.ApiResponseCustom;
import com.example.apijava.dto.product.ProductDTO;
import com.example.apijava.services.product.ProductService;
import com.example.apijava.utils.pageresult.PageResult;
import com.example.apijava.utils.validation.ValidationResultReponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class ProductController {

    @Autowired
    private ProductService productService;
    
    @GetMapping("/")
    public ResponseEntity<ApiResponseCustom<List<ProductDTO>>> getAllProducts(Pageable pageable) {
        PageResult<ProductDTO> pagedResult = productService.findAll(pageable);
        ApiResponseCustom<List<ProductDTO>> response = ApiResponseCustom.executeWithPagination(
                pagedResult::getContent,
                pagedResult.getCurrentPage(),
                pagedResult.getTotalPages(),
                pagedResult.getTotalElement()
        );
        return ResponseEntity.status(response.getCode()).body(response);
    }
   
    @GetMapping("/search/code")
    public ResponseEntity<ApiResponseCustom<List<ProductDTO>>> getProductsByCode(@RequestParam String code, Pageable pageable) {
        PageResult<ProductDTO> pagedResult = productService.findByCode(code, pageable);
        ApiResponseCustom<List<ProductDTO>> response = ApiResponseCustom.executeWithPagination(
                pagedResult::getContent,
                pagedResult.getCurrentPage(),
                pagedResult.getTotalPages(),
                pagedResult.getTotalElement()
        );
        return ResponseEntity.status(response.getCode()).body(response);
    }

   
    @GetMapping("/search/name")
    public ResponseEntity<ApiResponseCustom<List<ProductDTO>>> getProductsByName(@RequestParam String name, Pageable pageable) {
        PageResult<ProductDTO> pagedResult = productService.findByName(name, pageable);
        ApiResponseCustom<List<ProductDTO>> response = ApiResponseCustom.executeWithPagination(
                pagedResult::getContent,
                pagedResult.getCurrentPage(),
                pagedResult.getTotalPages(),
                pagedResult.getTotalElement()
        );
        return ResponseEntity.status(response.getCode()).body(response);
    }

    
    @GetMapping("/search/price")
    public ResponseEntity<ApiResponseCustom<List<ProductDTO>>> getProductsByPrice(@RequestParam Double price, Pageable pageable) {
        PageResult<ProductDTO> pagedResult = productService.findByPrice(price, pageable);
        ApiResponseCustom<List<ProductDTO>> response = ApiResponseCustom.executeWithPagination(
                pagedResult::getContent,
                pagedResult.getCurrentPage(),
                pagedResult.getTotalPages(),
                pagedResult.getTotalElement()
        );
        return ResponseEntity.status(response.getCode()).body(response);
    }

    
    @GetMapping("/search/category")
    public ResponseEntity<ApiResponseCustom<List<ProductDTO>>> getProductsByCategory(@RequestParam String category, Pageable pageable) {
        PageResult<ProductDTO> pagedResult = productService.findByCategory(category, pageable);
        ApiResponseCustom<List<ProductDTO>> response = ApiResponseCustom.executeWithPagination(
                pagedResult::getContent,
                pagedResult.getCurrentPage(),
                pagedResult.getTotalPages(),
                pagedResult.getTotalElement()
        );
        return ResponseEntity.status(response.getCode()).body(response);
    }
    
    
    @GetMapping("/search/quantity")
    public ResponseEntity<ApiResponseCustom<List<ProductDTO>>> getProductsByQuantity(@RequestParam Integer quantity, Pageable pageable) {
        PageResult<ProductDTO> pagedResult = productService.findByQuantity(quantity, pageable);
        ApiResponseCustom<List<ProductDTO>> response = ApiResponseCustom.executeWithPagination(
                pagedResult::getContent,
                pagedResult.getCurrentPage(),
                pagedResult.getTotalPages(),
                pagedResult.getTotalElement()
        );
        return ResponseEntity.status(response.getCode()).body(response);
    }

    
    @GetMapping("/search/inventory-status")
    public ResponseEntity<ApiResponseCustom<List<ProductDTO>>> getProductsByInventoryStatus(@RequestParam String inventoryStatus, Pageable pageable) {
        String upperCaseInventoryStatus = inventoryStatus.toUpperCase();
        PageResult<ProductDTO> pagedResult = productService.findByInventoryStatus(upperCaseInventoryStatus, pageable);
        ApiResponseCustom<List<ProductDTO>> response = ApiResponseCustom.executeWithPagination(
                pagedResult::getContent,
                pagedResult.getCurrentPage(),
                pagedResult.getTotalPages(),
                pagedResult.getTotalElement()
        );
        return ResponseEntity.status(response.getCode()).body(response);
    }
    
    
    @GetMapping("/search/rating")
    public ResponseEntity<ApiResponseCustom<List<ProductDTO>>> getProductsByRating(@RequestParam Integer rating, Pageable pageable) {
        PageResult<ProductDTO> pagedResult = productService.findByRating(rating, pageable);
        ApiResponseCustom<List<ProductDTO>> response = ApiResponseCustom.executeWithPagination(
                pagedResult::getContent,
                pagedResult.getCurrentPage(),
                pagedResult.getTotalPages(),
                pagedResult.getTotalElement()
        );
        return ResponseEntity.status(response.getCode()).body(response);
    }

    @PutMapping("/edit")
    public ResponseEntity<ValidationResultReponse> editProduct(@RequestBody ProductDTO product) {
        ValidationResultReponse response = productService.editProduct(product);
        return ResponseEntity.status(response.getCode()).body(response);
    }


    @PutMapping("/edits")
    public ResponseEntity<ValidationResultReponse> editProduct(@RequestBody List<ProductDTO> products) {
        ValidationResultReponse response = productService.editProducts(products);
        return ResponseEntity.status(response.getCode()).body(response);
    }

}

