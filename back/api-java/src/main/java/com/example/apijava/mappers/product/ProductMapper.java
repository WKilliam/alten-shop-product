package com.example.apijava.mappers.product;

import com.example.apijava.dto.product.ProductDTO;
import com.example.apijava.models.product.ProductModel;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {


    public ProductDTO toDTO(ProductModel productModel) {
        ProductDTO dto = new ProductDTO();
        dto.setId(productModel.getId());
        dto.setCode(productModel.getCode());
        dto.setName(productModel.getName());
        dto.setDescription(productModel.getDescription());
        dto.setImage(productModel.getImage());
        dto.setPrice(productModel.getPrice());
        dto.setCategory(productModel.getCategory());
        dto.setQuantity(productModel.getQuantity());
        dto.setInventoryStatus(productModel.getInventoryStatus());
        dto.setRating(productModel.getRating());
        return dto;
    }

    public ProductModel toEntity(ProductDTO dto) {
        ProductModel productModel = new ProductModel();
        productModel.setId(dto.getId());
        productModel.setCode(dto.getCode());
        productModel.setName(dto.getName());
        productModel.setDescription(dto.getDescription());
        productModel.setImage(dto.getImage());
        productModel.setPrice(dto.getPrice());
        productModel.setCategory(dto.getCategory());
        productModel.setQuantity(dto.getQuantity());
        productModel.setInventoryStatus(dto.getInventoryStatus());
        productModel.setRating(dto.getRating());
        return productModel;
    }

    public ProductModel toModel(ProductDTO product) {
        ProductModel productModel = new ProductModel();
        productModel.setId(product.getId());
        productModel.setCode(product.getCode());
        productModel.setName(product.getName());
        productModel.setDescription(product.getDescription());
        productModel.setImage(product.getImage());
        productModel.setPrice(product.getPrice());
        productModel.setCategory(product.getCategory());
        productModel.setQuantity(product.getQuantity());
        productModel.setInventoryStatus(product.getInventoryStatus());
        productModel.setRating(product.getRating());
        return productModel;
    }
}
