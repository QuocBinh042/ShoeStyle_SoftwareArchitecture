package com.shoestore.Server.controller;

import com.shoestore.Server.entities.Address;
import com.shoestore.Server.entities.Order;
import com.shoestore.Server.entities.Product;
import com.shoestore.Server.entities.Promotion;
import com.shoestore.Server.repositories.ProductRepository;
import com.shoestore.Server.service.ProductService;
import com.shoestore.Server.service.PromotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/promotion")
public class PromotionController {

    @Autowired
    private PromotionService promotionService;
    @Autowired
    private ProductService productService;
    @GetMapping("/discount-price/by-product-id/{id}")
    public double getDiscountPriceByProduct(@PathVariable("id") int id) {
        Product product=productService.getProductById(id);
        return promotionService.getDiscountedPrice(product);
    }
    @GetMapping("/by-product-id/{id}")
    public ResponseEntity<Promotion> getPromotionByProduct(@PathVariable("id") int id) {
        Product product=productService.getProductById(id);
        Promotion promotion=promotionService.getPromotionByProductID(product.getProductID());
        return ResponseEntity.ok(promotion);
    }
    @GetMapping("/by-id/{id}")
    public ResponseEntity<Promotion> getPromotionByID(@PathVariable("id") int id) {
        Promotion promotion=promotionService.getById(id);
        return ResponseEntity.ok(promotion);
    }
}