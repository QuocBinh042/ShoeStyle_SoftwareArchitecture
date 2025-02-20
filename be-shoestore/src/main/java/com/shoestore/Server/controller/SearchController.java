package com.shoestore.Server.controller;

import com.shoestore.Server.dto.request.ProductDTO;
import com.shoestore.Server.dto.response.PaginationResponse;
import com.shoestore.Server.entities.Product;
import com.shoestore.Server.service.BrandService;
import com.shoestore.Server.service.CategoryService;
import com.shoestore.Server.service.ProductService;
import com.shoestore.Server.service.SupplierService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

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
    public ResponseEntity<Map<String, Object>> getFiltered() {
        Map<String, Object> response = new HashMap<>();
        response.put("categories", categoryService.getAllCategory());
        response.put("brands", brandService.getAllBrand());
        response.put("suppliers", supplierService.getAllSupplier());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/all-products")
    public ResponseEntity<Map<String, Object>> getAllProducts(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "12") int pageSize) {
        PaginationResponse<ProductDTO> productPage = productService.getAllProduct(page, pageSize);

        Map<String, Object> response = new HashMap<>();
        response.put("products", productPage.getItems());
        response.put("total", productPage.getTotalElements());
        response.put("totalPages", productPage.getTotalPages());
        response.put("currentPage", page);
        response.put("pageSize", pageSize);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/filtered")
    public ResponseEntity<Map<String, Object>> getFilteredProducts(
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
        Page<ProductDTO> productPage = productService.getFilteredProducts(
                categoryIds, brandIds, colors, sizes, keyword, minPrice, maxPrice, sortBy, page, pageSize);

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("total", productPage.getTotalElements());
        response.put("totalPages", productPage.getTotalPages());
        response.put("products", productPage.getContent());
        response.put("currentPage", page);
        response.put("pageSize", pageSize);

        return ResponseEntity.ok(response);
    }
}

