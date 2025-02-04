package com.shoestore.Server.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
@Data
@Entity
@Table(name = "Promotion_Product")
public class PromotionProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "promotionID")
    private Promotion promotion;

    @ManyToOne
    @JoinColumn(name = "productID")
    private Product product;

    private LocalDateTime createdAt = LocalDateTime.now();

}
