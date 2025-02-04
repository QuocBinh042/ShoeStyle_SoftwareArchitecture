package com.shoestore.Server.repositories;

import com.shoestore.Server.entities.Promotion;
import com.shoestore.Server.entities.PromotionProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PromotionProductRepository extends JpaRepository<PromotionProduct, Integer> {
    @Query("SELECT pp.promotion FROM PromotionProduct pp WHERE pp.product.productID = :productId")
    List<Promotion> findPromotionsByProductId(@Param("productId") int productId);
}
