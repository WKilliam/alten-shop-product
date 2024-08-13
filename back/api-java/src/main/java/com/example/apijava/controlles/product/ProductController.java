package com.example.apijava.controlles.product;

import com.example.apijava.ApiResponse;
import com.example.apijava.dto.product.ProductDTO;
import com.example.apijava.services.product.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/")
    public ResponseEntity<ApiResponse<List<ProductDTO>>> getAllProducts(Pageable pageable) {
        ApiResponse<List<ProductDTO>> response = ApiResponse.execute(() -> productService.findAll(pageable));
        System.out.println(response);
        return ResponseEntity.status(response.getCode()).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductDTO>> getProductById(@PathVariable Long id) {
        ApiResponse<ProductDTO> response = ApiResponse.execute(() -> productService.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Product not found with id: " + id)));
        return ResponseEntity.status(response.getCode()).body(response);
    }

    @GetMapping("/search/code")
    public ResponseEntity<ApiResponse<List<ProductDTO>>> getProductsByCode(@RequestParam String code, Pageable pageable) {
        ApiResponse<List<ProductDTO>> response = ApiResponse.execute(() -> productService.findByCode(code, pageable));
        return ResponseEntity.status(response.getCode()).body(response);
    }

    @GetMapping("/search/name")
    public ResponseEntity<ApiResponse<List<ProductDTO>>> getProductsByName(@RequestParam String name, Pageable pageable) {
        ApiResponse<List<ProductDTO>> response = ApiResponse.execute(() -> productService.findByName(name, pageable));
        return ResponseEntity.status(response.getCode()).body(response);
    }

    @GetMapping("/search/price")
    public ResponseEntity<ApiResponse<List<ProductDTO>>> getProductsByPrice(@RequestParam Double price, Pageable pageable) {
        ApiResponse<List<ProductDTO>> response = ApiResponse.execute(() -> productService.findByPrice(price, pageable));
        return ResponseEntity.status(response.getCode()).body(response);
    }

    @GetMapping("/search/category")
    public ResponseEntity<ApiResponse<List<ProductDTO>>> getProductsByCategory(@RequestParam String category, Pageable pageable) {
        ApiResponse<List<ProductDTO>> response = ApiResponse.execute(() -> productService.findByCategory(category, pageable));
        return ResponseEntity.status(response.getCode()).body(response);
    }

    @GetMapping("/search/quantity")
    public ResponseEntity<ApiResponse<List<ProductDTO>>> getProductsByQuantity(@RequestParam Integer quantity, Pageable pageable) {
        ApiResponse<List<ProductDTO>> response = ApiResponse.execute(() -> productService.findByQuantity(quantity, pageable));
        return ResponseEntity.status(response.getCode()).body(response);
    }

    @GetMapping("/search/inventoryStatus")
    public ResponseEntity<ApiResponse<List<ProductDTO>>> getProductsByInventoryStatus(@RequestParam String inventoryStatus, Pageable pageable) {
        ApiResponse<List<ProductDTO>> response = ApiResponse.execute(() -> productService.findByInventoryStatus(inventoryStatus, pageable));
        return ResponseEntity.status(response.getCode()).body(response);
    }

    @GetMapping("/search/rating")
    public ResponseEntity<ApiResponse<List<ProductDTO>>> getProductsByRating(@RequestParam Integer rating, Pageable pageable) {
        ApiResponse<List<ProductDTO>> response = ApiResponse.execute(() -> productService.findByRating(rating, pageable));
        return ResponseEntity.status(response.getCode()).body(response);
    }
}
