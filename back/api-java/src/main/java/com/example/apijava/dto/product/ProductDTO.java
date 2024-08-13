package com.example.apijava.dto.product;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductDTO {
    private Long id;
    private String code;
    private String name;
    private String description;
    private String image;
    private Double price;
    private String category;
    private Integer quantity;
    private String inventoryStatus;
    private Integer rating;
}
