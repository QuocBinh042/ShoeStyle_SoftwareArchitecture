package com.shoestore.Server.controller;

import com.shoestore.Server.dto.request.ProductDTO;
import com.shoestore.Server.dto.request.ProductDetailDTO;
import com.shoestore.Server.dto.response.ApiStatusResponse;
import com.shoestore.Server.dto.response.ProductDetailResponse;
import com.shoestore.Server.dto.response.RestResponse;
import com.shoestore.Server.service.BrandService;
import com.shoestore.Server.service.CategoryService;
import com.shoestore.Server.service.ProductDetailService;
import com.shoestore.Server.service.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/product-details")
public class ProductDetailController {
    private final ProductDetailService productDetailService;
    private final ProductService productService;
    private final BrandService brandService;
    private final CategoryService categoryService;

    public ProductDetailController(ProductDetailService productDetailService, ProductService productService,
                                   BrandService brandService, CategoryService categoryService) {
        this.productDetailService = productDetailService;
        this.productService = productService;
        this.brandService = brandService;
        this.categoryService = categoryService;
    }

    @GetMapping("/by-product-id/{id}")
    public ResponseEntity<RestResponse<ProductDetailResponse>> getProductDetailsByProductId(@PathVariable int id) {
        try {
            log.info("Fetching product details for product ID: {}", id);
            ProductDTO productDTO = productService.getProductById(id);
            if (productDTO == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new RestResponse<>(ApiStatusResponse.NOT_FOUND, "Product not found"));
            }

            List<ProductDetailDTO> productDetails = productDetailService.getByProductId(id);
            ProductDetailResponse response = new ProductDetailResponse(
                    productDetails,
                    productDTO.getProductName(),
                    brandService.getBrandById(productDTO.getBrandID()).getName(),
                    productDTO.getDescription(),
                    categoryService.getCategory(productDTO.getCategoryID()).getName(),
                    productDTO.getPrice(),
                    productDTO.getImageURL()
            );

            return ResponseEntity.ok(new RestResponse<>(ApiStatusResponse.SUCCESS, response));
        } catch (Exception e) {
            log.error("Failed to fetch product details for product ID: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new RestResponse<>(ApiStatusResponse.INTERNAL_SERVER_ERROR, e.getMessage()));
        }
    }

    @GetMapping("/by-order-detail-id/{id}")
    public ResponseEntity<RestResponse<List<ProductDetailDTO>>> getProductDetailsByOrderDetailId(@PathVariable int id) {
        try {
            log.info("Fetching product details for order detail ID: {}", id);
            List<ProductDetailDTO> productDetails = productDetailService.getByProductId(id);
            return ResponseEntity.ok(new RestResponse<>(ApiStatusResponse.SUCCESS, productDetails));
        } catch (Exception e) {
            log.error("Failed to fetch product details for order detail ID: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new RestResponse<>(ApiStatusResponse.INTERNAL_SERVER_ERROR, e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<RestResponse<ProductDetailDTO>> getProductDetailsById(@PathVariable int id) {
        try {
            log.info("Fetching product detail by ID: {}", id);
            ProductDetailDTO productDetail = productDetailService.getProductDetailById(id);
            if (productDetail == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new RestResponse<>(ApiStatusResponse.NOT_FOUND, "Product detail not found"));
            }
            return ResponseEntity.ok(new RestResponse<>(ApiStatusResponse.SUCCESS, productDetail));
        } catch (Exception e) {
            log.error("Failed to fetch product detail by ID: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new RestResponse<>(ApiStatusResponse.INTERNAL_SERVER_ERROR, e.getMessage()));
        }
    }
}
