package com.shoestore.Server.controller;

import com.shoestore.Server.dto.request.ProductDTO;
import com.shoestore.Server.dto.response.ApiStatusResponse;
import com.shoestore.Server.dto.response.RestResponse;
import com.shoestore.Server.service.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<RestResponse<ProductDTO>> getProductById(@PathVariable int id) {
        try {
            log.info("Fetching product with ID: {}", id);
            ProductDTO productDTO = productService.getProductById(id);
            if (productDTO != null) {
                return ResponseEntity.ok(new RestResponse<>(ApiStatusResponse.SUCCESS, productDTO));
            }
            log.warn("Product with ID {} not found", id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new RestResponse<>(ApiStatusResponse.NOT_FOUND, "Product not found"));
        } catch (Exception e) {
            log.error("Failed to fetch product with ID: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new RestResponse<>(ApiStatusResponse.INTERNAL_SERVER_ERROR, e.getMessage()));
        }
    }

    @GetMapping("/by-product-details-id/{id}")
    public ResponseEntity<RestResponse<ProductDTO>> getProductsByProductDetails(@PathVariable int id) {
        try {
            log.info("Fetching product by product details ID: {}", id);
            ProductDTO productDTO = productService.getProductByProductDetailsId(id);
            if (productDTO != null) {
                return ResponseEntity.ok(new RestResponse<>(ApiStatusResponse.SUCCESS, productDTO));
            }
            log.warn("Product with details ID {} not found", id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new RestResponse<>(ApiStatusResponse.NOT_FOUND, "Product not found"));
        } catch (Exception e) {
            log.error("Failed to fetch product by product details ID: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new RestResponse<>(ApiStatusResponse.INTERNAL_SERVER_ERROR, e.getMessage()));
        }
    }
}
