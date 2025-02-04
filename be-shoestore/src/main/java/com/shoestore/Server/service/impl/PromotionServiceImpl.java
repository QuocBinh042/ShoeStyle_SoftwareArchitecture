package com.shoestore.Server.service.impl;

import com.shoestore.Server.entities.Product;
import com.shoestore.Server.entities.Promotion;
import com.shoestore.Server.repositories.PromotionProductRepository;
import com.shoestore.Server.repositories.PromotionRepository;
import com.shoestore.Server.service.PromotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class PromotionServiceImpl implements PromotionService {
    private final PromotionRepository promotionRepository;
    private final PromotionProductRepository promotionProductRepository;
    public PromotionServiceImpl(PromotionRepository promotionRepository, PromotionProductRepository promotionProductRepository) {
        this.promotionRepository = promotionRepository;
        this.promotionProductRepository = promotionProductRepository;
    }

    @Override
    public double getDiscountedPrice(Product product) {
        List<Promotion> promotions = promotionProductRepository.findPromotionsByProductId(product.getProductID());

        if (promotions.isEmpty()) {
            return product.getPrice();
        }
        Promotion promotion = promotions.get(0);
        double discountPrice = product.getPrice();
        double discountValue = promotion.getDiscountValue().doubleValue();

        if ("percent".equalsIgnoreCase(promotion.getDiscountType())) {
            discountPrice = discountPrice - (discountPrice * (discountValue / 100.0));
        } else if ("fixed".equalsIgnoreCase(promotion.getDiscountType())) {
            discountPrice = discountPrice - discountValue;
        }

        return Math.max(discountPrice, 0.0);
    }


}
