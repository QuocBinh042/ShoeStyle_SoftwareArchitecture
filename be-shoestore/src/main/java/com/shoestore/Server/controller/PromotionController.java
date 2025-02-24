package com.shoestore.Server.controller;

import com.shoestore.Server.dto.request.ProductDTO;
import com.shoestore.Server.dto.request.PromotionDTO;
import com.shoestore.Server.dto.response.ApiStatusResponse;
import com.shoestore.Server.dto.response.RestResponse;
import com.shoestore.Server.service.ProductService;
import com.shoestore.Server.service.PromotionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/promotion")
public class PromotionController {
    private final PromotionService promotionService;
    private final ProductService productService;

    public PromotionController(PromotionService promotionService, ProductService productService) {
        this.promotionService = promotionService;
        this.productService = productService;
    }

    @GetMapping("/discount-price/by-product-id/{id}")
    public ResponseEntity<RestResponse<Double>> getDiscountPriceByProduct(@PathVariable int id) {
        try {
            log.info("Fetching discount price for product ID: {}", id);
            ProductDTO product = productService.getProductById(id);
            if (product == null) {
                log.warn("Product not found with ID: {}", id);
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new RestResponse<>(ApiStatusResponse.NOT_FOUND, "Product not found"));
            }
            double discountedPrice = promotionService.getDiscountedPrice(product);
            return ResponseEntity.ok(new RestResponse<>(ApiStatusResponse.SUCCESS, discountedPrice));
        } catch (Exception e) {
            log.error("Failed to fetch discount price for product ID: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new RestResponse<>(ApiStatusResponse.INTERNAL_SERVER_ERROR, e.getMessage()));
        }
    }

    @GetMapping("/by-product-id/{id}")
    public ResponseEntity<RestResponse<PromotionDTO>> getPromotionByProduct(@PathVariable int id) {
        try {
            log.info("Fetching promotion for product ID: {}", id);
            ProductDTO product = productService.getProductById(id);
            if (product == null) {
                log.warn("Product not found with ID: {}", id);
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new RestResponse<>(ApiStatusResponse.NOT_FOUND, "Product not found"));
            }
            PromotionDTO promotion = promotionService.getPromotionByProductID(product.getProductID());
            return ResponseEntity.ok(new RestResponse<>(ApiStatusResponse.SUCCESS, promotion));
        } catch (Exception e) {
            log.error("Failed to fetch promotion for product ID: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new RestResponse<>(ApiStatusResponse.INTERNAL_SERVER_ERROR, e.getMessage()));
        }
    }

    @GetMapping("/by-id/{id}")
    public ResponseEntity<RestResponse<PromotionDTO>> getPromotionByID(@PathVariable int id) {
        try {
            log.info("Fetching promotion by ID: {}", id);
            PromotionDTO promotion = promotionService.getPromotionById(id);
            if (promotion != null) {
                return ResponseEntity.ok(new RestResponse<>(ApiStatusResponse.SUCCESS, promotion));
            }
            log.warn("Promotion not found with ID: {}", id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new RestResponse<>(ApiStatusResponse.NOT_FOUND, "Promotion not found"));
        } catch (Exception e) {
            log.error("Failed to fetch promotion by ID: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new RestResponse<>(ApiStatusResponse.INTERNAL_SERVER_ERROR, e.getMessage()));
        }
    }
}
