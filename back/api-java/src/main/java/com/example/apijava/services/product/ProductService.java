package com.example.apijava.services.product;

import com.example.apijava.dto.product.ProductDTO;
import com.example.apijava.mappers.product.ProductMapper;
import com.example.apijava.models.product.ProductModel;
import com.example.apijava.repositories.product.ProductRepository;
import com.example.apijava.utils.pageresult.PageResult;
import com.example.apijava.utils.validation.ValidationResultReponse;
import com.example.apijava.utils.validation.ValidationRows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.List;
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


    public ValidationResultReponse editProduct(ProductDTO product) {

        if (product == null) {
            return ValidationResultReponse.error(400, "Product cannot be null");
        }
        if (product.getId() == null) {
            return ValidationResultReponse.error(400, "Product ID cannot be null");
        }
        if (product.getName() == null || product.getName().isEmpty()) {
            return ValidationResultReponse.error(400, "Product name cannot be empty");
        }
        if (product.getPrice() == null || product.getPrice() < 0) {
            return ValidationResultReponse.error(400, "Product price must be positive");
        }
        ProductModel productModel = productMapper.toModel(product);
        productRepository.save(productModel);
        PageResult<ProductDTO> pageResult = new PageResult<>(
                productRepository.findAll().stream()
                        .map(productMapper::toDTO)
                        .collect(Collectors.toList()),
                0,
                1,
                productRepository.findAll().size()
        );
        return ValidationResultReponse.success("Product updated successfully");
    }

    public ValidationResultReponse editProducts(List<ProductDTO> products) {
        ValidationResultReponse validationResult = new ValidationResultReponse();
        List<ProductModel> validProducts = new ArrayList<>();

        for (ProductDTO p : products) {
            if (p == null) {
                validationResult.addRawError(new ValidationRows(400, null, "Product cannot be null"));
                continue;
            }
            if (p.getId() == null) {
                validationResult.addRawError(new ValidationRows(400, null, "Product ID cannot be null"));
                continue;
            }
            if (p.getName() == null || p.getName().isEmpty()) {
                validationResult.addRawError(new ValidationRows(400, p.getId(), "Product name cannot be empty"));
                continue;
            }
            if (p.getPrice() == null || p.getPrice() < 0) {
                validationResult.addRawError(new ValidationRows(400, p.getId(), "Product price must be positive"));
                continue;
            }

            validProducts.add(productMapper.toModel(p));
        }

        if (!validProducts.isEmpty()) {
            productRepository.saveAll(validProducts);
        }

        if (validationResult.getRawErrors().isEmpty()) {
            validationResult.setCode(200);
            validationResult.setMessage("Products updated successfully");
        } else {
            validationResult.setCode(207);
            validationResult.setMessage("Some products could not be updated");
        }

        return validationResult;
    }
}
