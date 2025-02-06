package com.shoestore.Server.service;

import com.shoestore.Server.entities.Product;
import com.shoestore.Server.entities.Promotion;

import java.util.List;

public interface PromotionService {
    double getDiscountedPrice(Product product);
    Promotion getPromotionByProductID(int id);
    Promotion getById(int id);
}
