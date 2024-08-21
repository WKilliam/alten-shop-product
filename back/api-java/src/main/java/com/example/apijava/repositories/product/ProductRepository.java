package com.example.apijava.repositories.product;

import com.example.apijava.models.product.ProductModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProductRepository extends JpaRepository<ProductModel, Long> {

    @Query("SELECT p FROM ProductModel p")
    Page<ProductModel> findAllProducts(Pageable pageable);

    Page<ProductModel> findByCodeStartingWith(String code, Pageable pageable);
    Page<ProductModel> findByNameStartingWith(String name, Pageable pageable);
    Page<ProductModel> findByPrice(Double price, Pageable pageable);
    Page<ProductModel> findByCategoryStartingWith(String category, Pageable pageable);
    Page<ProductModel> findByQuantity(Integer quantity, Pageable pageable);
    Page<ProductModel> findByInventoryStatusStartingWith(String inventoryStatus, Pageable pageable);
    Page<ProductModel> findByRating(Integer rating, Pageable pageable);




}
