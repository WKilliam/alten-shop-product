package com.example.apijava.repositories.product;
import com.example.apijava.models.product.ProductModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProductRepository extends JpaRepository<ProductModel, Long> {

    @Query("SELECT p FROM ProductModel p")
    Page<ProductModel> findAllProducts(Pageable pageable);

    Page<ProductModel> findByCode(String code, Pageable pageable);
    Page<ProductModel> findByName(String name, Pageable pageable);
    Page<ProductModel> findByPrice(Double price, Pageable pageable);
    Page<ProductModel> findByCategory(String category, Pageable pageable);
    Page<ProductModel> findByQuantity(Integer quantity, Pageable pageable);
    Page<ProductModel> findByInventoryStatus(String inventoryStatus, Pageable pageable);
    Page<ProductModel> findByRating(Integer rating, Pageable pageable);
}
