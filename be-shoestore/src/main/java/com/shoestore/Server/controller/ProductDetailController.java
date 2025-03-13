package com.shoestore.Server.controller;

import com.shoestore.Server.dto.request.ProductDTO;
import com.shoestore.Server.dto.request.ProductDetailDTO;
import com.shoestore.Server.dto.response.ProductDetailResponse;
import com.shoestore.Server.service.BrandService;
import com.shoestore.Server.service.CategoryService;
import com.shoestore.Server.service.ProductDetailService;
import com.shoestore.Server.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<ProductDetailResponse> getProductDetailsByProductId(@PathVariable int id) {
        ProductDTO productDTO = productService.getProductById(id);
        if (productDTO == null) {
            return ResponseEntity.notFound().build();
        }

        List<ProductDetailDTO> productDetails = productDetailService.getByProductId(id);
        ProductDetailResponse response = new ProductDetailResponse(
                productDetails,
                productDTO.getProductName(),
                categoryService.getCategory(productDTO.getCategoryID()).getName(),
                brandService.getBrandById(productDTO.getBrandID()).getName(),
                productDTO.getDescription(),
                productDTO.getPrice(),
                productDTO.getImageURL()
        );

        return ResponseEntity.ok(response);
    }

    @GetMapping("/by-order-detail-id/{id}")
    public ResponseEntity<List<ProductDetailDTO>> getProductDetailsByOrderDetailId(@PathVariable int id) {
        return ResponseEntity.ok(productDetailService.getByProductId(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDetailDTO> getProductDetailsById(@PathVariable int id) {
        ProductDetailDTO productDetail = productDetailService.getProductDetailById(id);
        return productDetail != null ? ResponseEntity.ok(productDetail) : ResponseEntity.notFound().build();
    }
}
