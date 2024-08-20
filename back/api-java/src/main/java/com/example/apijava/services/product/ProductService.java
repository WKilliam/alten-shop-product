package com.example.apijava.services.product;

import com.example.apijava.dto.product.ProductDTO;
import com.example.apijava.mappers.product.ProductMapper;
import com.example.apijava.models.product.ProductModel;
import com.example.apijava.repositories.product.ProductRepository;
import com.example.apijava.utils.pageresult.PageResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductMapper productMapper;

    public PageResult<ProductDTO> findAll(Pageable pageable) {
        Page<ProductModel> products = productRepository.findAllProducts(pageable);
        return new PageResult<>(
                products.stream()
                        .map(productMapper::toDTO)
                        .collect(Collectors.toList()),
                products.getNumber(),
                products.getTotalPages(),
                products.getTotalElements()
        );
    }

//    public PageResult<ProductDTO> findAllWithSearch(Pageable pageable,String search) {
//        Page<ProductModel> products = productRepository.findAllProductsSearch(pageable,search);
//        return new PageResult<>(
//                products.stream()
//                        .map(productMapper::toDTO)
//                        .collect(Collectors.toList()),
//                products.getNumber() + 1,
//                products.getTotalPages()
//        );
//    }

    public Optional<ProductDTO> findById(Long id) {
        return productRepository.findById(id).map(productMapper::toDTO);
    }

    public PageResult<ProductDTO> findByCode(String code, Pageable pageable) {
        Page<ProductModel> products = productRepository.findByCodeStartingWith(code, pageable);
        return new PageResult<>(
                products.stream()
                        .map(productMapper::toDTO)
                        .collect(Collectors.toList()),
                products.getNumber(),
                products.getTotalPages(),
                products.getTotalElements()
        );
    }

    public PageResult<ProductDTO> findByName(String name, Pageable pageable) {
        Page<ProductModel> products = productRepository.findByNameStartingWith(name, pageable);
        return new PageResult<>(
                products.stream()
                        .map(productMapper::toDTO)
                        .collect(Collectors.toList()),
                products.getNumber() ,
                products.getTotalPages(),
                products.getTotalElements()
        );
    }

    public PageResult<ProductDTO> findByPrice(Double price, Pageable pageable) {
        Page<ProductModel> products = productRepository.findByPrice(price, pageable);
        return new PageResult<>(
                products.stream()
                        .map(productMapper::toDTO)
                        .collect(Collectors.toList()),
                products.getNumber() ,
                products.getTotalPages(),
                products.getTotalElements()
        );
    }

    public PageResult<ProductDTO> findByCategory(String category, Pageable pageable) {
        Page<ProductModel> products = productRepository.findByCategoryStartingWith(category, pageable);
        return new PageResult<>(
                products.stream()
                        .map(productMapper::toDTO)
                        .collect(Collectors.toList()),
                products.getNumber(),
                products.getTotalPages(),
                products.getTotalElements()
        );
    }

    public PageResult<ProductDTO> findByQuantity(Integer quantity, Pageable pageable) {
        Page<ProductModel> products = productRepository.findByQuantity(quantity, pageable);
        return new PageResult<>(
                products.stream()
                        .map(productMapper::toDTO)
                        .collect(Collectors.toList()),
                products.getNumber(),
                products.getTotalPages(),
                products.getTotalElements()
        );
    }

    public PageResult<ProductDTO> findByInventoryStatus(String inventoryStatus, Pageable pageable) {
        Page<ProductModel> products = productRepository.findByInventoryStatusStartingWith(inventoryStatus, pageable);
        return new PageResult<>(
                products.stream()
                        .map(productMapper::toDTO)
                        .collect(Collectors.toList()),
                products.getNumber(),
                products.getTotalPages(),
                products.getTotalElements()
        );
    }

    public PageResult<ProductDTO> findByRating(Integer rating, Pageable pageable) {
        Page<ProductModel> products = productRepository.findByRating(rating, pageable);
        return new PageResult<>(
                products.stream()
                        .map(productMapper::toDTO)
                        .collect(Collectors.toList()),
                products.getNumber(),
                products.getTotalPages(),
                products.getTotalElements()
        );
    }


}
