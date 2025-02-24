package com.shoestore.Server.controller;

import com.shoestore.Server.dto.request.ProductDTO;
import com.shoestore.Server.dto.response.ApiStatusResponse;
import com.shoestore.Server.dto.response.PaginationResponse;
import com.shoestore.Server.dto.response.RestResponse;
import com.shoestore.Server.service.BrandService;
import com.shoestore.Server.service.CategoryService;
import com.shoestore.Server.service.ProductService;
import com.shoestore.Server.service.SupplierService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/search")
public class SearchController {
    private final ProductService productService;
    private final CategoryService categoryService;
    private final BrandService brandService;
    private final SupplierService supplierService;

    public SearchController(ProductService productService, CategoryService categoryService, BrandService brandService, SupplierService supplierService) {
        this.productService = productService;
        this.categoryService = categoryService;
        this.brandService = brandService;
        this.supplierService = supplierService;
    }

    @GetMapping("/show-filtered")
    public ResponseEntity<RestResponse<Map<String, Object>>> getFilterOptions() {
        try {
            log.info("Fetching filter options for products.");
            Map<String, Object> response = new HashMap<>();
            response.put("categories", categoryService.getAllCategory());
            response.put("brands", brandService.getAllBrand());
            response.put("suppliers", supplierService.getAllSupplier());
            return ResponseEntity.ok(new RestResponse<>(ApiStatusResponse.SUCCESS, response));
        } catch (Exception e) {
            log.error("Error fetching filter options", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new RestResponse<>(ApiStatusResponse.INTERNAL_SERVER_ERROR, e.getMessage()));
        }
    }

    @GetMapping("/all-products")
    public ResponseEntity<RestResponse<PaginationResponse<ProductDTO>>> getAllProducts(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "12") int pageSize) {
        try {
            log.info("Fetching all products, page: {}, pageSize: {}", page, pageSize);
            PaginationResponse<ProductDTO> productPage = productService.getAllProduct(page, pageSize);
            return ResponseEntity.ok(new RestResponse<>(ApiStatusResponse.SUCCESS, productPage));
        } catch (Exception e) {
            log.error("Error fetching all products", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new RestResponse<>(ApiStatusResponse.INTERNAL_SERVER_ERROR, e.getMessage()));
        }
    }

    @GetMapping("/filtered")
    public ResponseEntity<RestResponse<PaginationResponse<ProductDTO>>> getFilteredProducts(
            @RequestParam(required = false) List<Integer> categoryIds,
            @RequestParam(required = false) List<Integer> brandIds,
            @RequestParam(required = false) List<String> colors,
            @RequestParam(required = false) List<String> sizes,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String sortBy,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "12") int pageSize) {
        try {
            log.info("Fetching filtered products with filters: categoryIds={}, brandIds={}, colors={}, sizes={}, minPrice={}, maxPrice={}, keyword={}, sortBy={}, page={}, pageSize={}",
                    categoryIds, brandIds, colors, sizes, minPrice, maxPrice, keyword, sortBy, page, pageSize);

            PaginationResponse<ProductDTO> productPage = productService.getFilteredProducts(
                    categoryIds, brandIds, colors, sizes, keyword, minPrice, maxPrice, sortBy, page, pageSize);

            return ResponseEntity.ok(new RestResponse<>(ApiStatusResponse.SUCCESS, productPage));
        } catch (Exception e) {
            log.error("Error fetching filtered products", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new RestResponse<>(ApiStatusResponse.INTERNAL_SERVER_ERROR, e.getMessage()));
        }
    }
}