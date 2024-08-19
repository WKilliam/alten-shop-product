package com.example.apijava.controlles.product;

import com.example.apijava.ApiResponse;
import com.example.apijava.dto.product.ProductDTO;
import com.example.apijava.services.product.ProductService;
import com.example.apijava.utils.pageresult.PageResult;
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
        PageResult<ProductDTO> pagedResult = productService.findAll(pageable);
        ApiResponse<List<ProductDTO>> response = ApiResponse.executeWithPagination(
                pagedResult::getContent,
                pagedResult.getCurrentPage(),
                pagedResult.getTotalPages(),
                pagedResult.getTotalElement()
        );
        return ResponseEntity.status(response.getCode()).body(response);
    }

//    @GetMapping("/")
//    public ResponseEntity<ApiResponse<List<ProductDTO>>> getAllProductsSearch(@RequestParam String search,Pageable pageable) {
//        PageResult<ProductDTO> pagedResult = productService.findAllWithSearch(pageable,search);
//        ApiResponse<List<ProductDTO>> response = ApiResponse.executeWithPagination(
//                pagedResult::getContent,
//                pagedResult.getCurrentPage(),
//                pagedResult.getTotalPages()
//        );
//
//        return ResponseEntity.status(response.getCode()).body(response);
//    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductDTO>> getProductById(@PathVariable Long id) {
        ApiResponse<ProductDTO> response = ApiResponse.execute(() -> productService.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Product not found with id: " + id)));
        return ResponseEntity.status(response.getCode()).body(response);
    }

    @GetMapping("/search/code")
    public ResponseEntity<ApiResponse<List<ProductDTO>>> getProductsByCode(@RequestParam String code, Pageable pageable) {
        PageResult<ProductDTO> pagedResult = productService.findByCode(code, pageable);
        ApiResponse<List<ProductDTO>> response = ApiResponse.executeWithPagination(
                pagedResult::getContent,
                pagedResult.getCurrentPage(),
                pagedResult.getTotalPages(),
                pagedResult.getTotalElement()
        );

        return ResponseEntity.status(response.getCode()).body(response);
    }

    @GetMapping("/search/name")
    public ResponseEntity<ApiResponse<List<ProductDTO>>> getProductsByName(@RequestParam String name, Pageable pageable) {
        PageResult<ProductDTO> pagedResult = productService.findByName(name, pageable);
        ApiResponse<List<ProductDTO>> response = ApiResponse.executeWithPagination(
                pagedResult::getContent,
                pagedResult.getCurrentPage(),
                pagedResult.getTotalPages(),
                pagedResult.getTotalElement()
        );

        return ResponseEntity.status(response.getCode()).body(response);
    }

    @GetMapping("/search/price")
    public ResponseEntity<ApiResponse<List<ProductDTO>>> getProductsByPrice(@RequestParam Double price, Pageable pageable) {
        PageResult<ProductDTO> pagedResult = productService.findByPrice(price, pageable);
        ApiResponse<List<ProductDTO>> response = ApiResponse.executeWithPagination(
                pagedResult::getContent,
                pagedResult.getCurrentPage(),
                pagedResult.getTotalPages(),
                pagedResult.getTotalElement()
        );

        return ResponseEntity.status(response.getCode()).body(response);
    }

    @GetMapping("/search/category")
    public ResponseEntity<ApiResponse<List<ProductDTO>>> getProductsByCategory(@RequestParam String category, Pageable pageable) {
        PageResult<ProductDTO> pagedResult = productService.findByCategory(category, pageable);
        ApiResponse<List<ProductDTO>> response = ApiResponse.executeWithPagination(
                pagedResult::getContent,
                pagedResult.getCurrentPage(),
                pagedResult.getTotalPages(),
                pagedResult.getTotalElement()
        );

        return ResponseEntity.status(response.getCode()).body(response);
    }

    @GetMapping("/search/quantity")
    public ResponseEntity<ApiResponse<List<ProductDTO>>> getProductsByQuantity(@RequestParam Integer quantity, Pageable pageable) {
        PageResult<ProductDTO> pagedResult = productService.findByQuantity(quantity, pageable);
        ApiResponse<List<ProductDTO>> response = ApiResponse.executeWithPagination(
                pagedResult::getContent,
                pagedResult.getCurrentPage(),
                pagedResult.getTotalPages(),
                pagedResult.getTotalElement()
        );

        return ResponseEntity.status(response.getCode()).body(response);
    }

    @GetMapping("/search/inventoryStatus")
    public ResponseEntity<ApiResponse<List<ProductDTO>>> getProductsByInventoryStatus(@RequestParam String inventoryStatus, Pageable pageable) {
        PageResult<ProductDTO> pagedResult = productService.findByInventoryStatus(inventoryStatus, pageable);
        ApiResponse<List<ProductDTO>> response = ApiResponse.executeWithPagination(
                pagedResult::getContent,
                pagedResult.getCurrentPage(),
                pagedResult.getTotalPages(),
                pagedResult.getTotalElement()
        );

        return ResponseEntity.status(response.getCode()).body(response);
    }

    @GetMapping("/search/rating")
    public ResponseEntity<ApiResponse<List<ProductDTO>>> getProductsByRating(@RequestParam Integer rating, Pageable pageable) {
        PageResult<ProductDTO> pagedResult = productService.findByRating(rating, pageable);
        ApiResponse<List<ProductDTO>> response = ApiResponse.executeWithPagination(
                pagedResult::getContent,
                pagedResult.getCurrentPage(),
                pagedResult.getTotalPages(),
                pagedResult.getTotalElement()
        );

        return ResponseEntity.status(response.getCode()).body(response);
    }
}
