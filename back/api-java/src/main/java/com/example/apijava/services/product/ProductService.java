package com.example.apijava.services.product;

import com.example.apijava.dto.product.ProductDTO;
import com.example.apijava.mappers.product.ProductMapper;
import com.example.apijava.models.product.ProductModel;
import com.example.apijava.repositories.product.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductMapper productMapper;

    public List<ProductDTO> findAll(Pageable pageable) {
        Page<ProductModel> products = productRepository.findAllProducts(pageable);
        return products.stream()
                .map(productMapper::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<ProductDTO> findById(Long id) {
        return productRepository.findById(id).map(productMapper::toDTO);
    }

    public List<ProductDTO> findByCode(String code,Pageable pageable) {
        Page<ProductModel> products = productRepository.findByCode(code, pageable);
        return products.stream()
                .map(productMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<ProductDTO> findByName(String name, Pageable pageable) {
        Page<ProductModel> products = productRepository.findByName(name, pageable);
        return products.stream()
                .map(productMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<ProductDTO> findByPrice(Double price, Pageable pageable) {
        Page<ProductModel> products = productRepository.findByPrice(price, pageable);
        return products.stream()
                .map(productMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<ProductDTO> findByCategory(String category, Pageable pageable) {
        Page<ProductModel> products = productRepository.findByCategory(category, pageable);
        return products.stream()
                .map(productMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<ProductDTO> findByQuantity(Integer quantity, Pageable pageable) {
        Page<ProductModel> products = productRepository.findByQuantity(quantity, pageable);
        return products.stream()
                .map(productMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<ProductDTO> findByInventoryStatus(String inventoryStatus, Pageable pageable) {
        Page<ProductModel> products = productRepository.findByInventoryStatus(inventoryStatus, pageable);
        return products.stream()
                .map(productMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<ProductDTO> findByRating(Integer rating, Pageable pageable) {
        Page<ProductModel> products = productRepository.findByRating(rating, pageable);
        return products.stream()
                .map(productMapper::toDTO)
                .collect(Collectors.toList());
    }
}
