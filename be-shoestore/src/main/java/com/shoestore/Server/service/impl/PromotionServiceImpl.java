package com.shoestore.Server.service.impl;

import com.shoestore.Server.entities.Product;
import com.shoestore.Server.entities.Promotion;
import com.shoestore.Server.repositories.PromotionRepository;
import com.shoestore.Server.service.PromotionService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PromotionServiceImpl implements PromotionService {
    private final PromotionRepository promotionRepository;

    public PromotionServiceImpl(PromotionRepository promotionRepository) {
        this.promotionRepository = promotionRepository;

    }

    @Override
    public double getDiscountedPrice(Product product) {
        Optional<Promotion> optionalPromotion = promotionRepository.findPromotionByProductId(product.getProductID());

        if (optionalPromotion.isEmpty()) {
            return product.getPrice();
        }

        Promotion promotion = optionalPromotion.get();
        if(promotion.getEndDate().isBefore(LocalDateTime.now()))
        {
            return product.getPrice();
        }
        double discountPrice = product.getPrice();
        double discountValue = promotion.getDiscountValue().doubleValue();

        if ("percent".equalsIgnoreCase(promotion.getDiscountType())) {
            discountPrice -= discountPrice * (discountValue / 100.0);
        } else if ("fixed".equalsIgnoreCase(promotion.getDiscountType())) {
            discountPrice -= discountValue;
        }

        return Math.max(discountPrice, 0.0);
    }


    @Override
    public Promotion getPromotionByProductID(int id) {
        return promotionRepository.findPromotionByProductId(id).orElse(null);
    }

    @Override
    public Promotion getById(int id) {
        return promotionRepository.findById(id).orElse(null);
    }


}
