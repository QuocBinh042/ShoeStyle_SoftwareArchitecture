package com.shoestore.Server.service;

import com.shoestore.Server.entities.Product;

import java.math.BigDecimal;

public interface PromotionService {
    double getDiscountedPrice(Product product);
}
