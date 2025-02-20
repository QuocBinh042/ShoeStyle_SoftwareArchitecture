package com.shoestore.Server.controller;


import com.shoestore.Server.dto.request.ProductDTO;
import com.shoestore.Server.dto.request.ProductDetailDTO;
import com.shoestore.Server.dto.response.ProductDetailResponse;
import com.shoestore.Server.entities.Product;
import com.shoestore.Server.entities.ProductDetail;
import com.shoestore.Server.service.BrandService;
import com.shoestore.Server.service.CategoryService;
import com.shoestore.Server.service.ProductDetailService;
import com.shoestore.Server.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/product-details")
public class ProductDetailController {
    private final ProductDetailService productDetailService;
    private final ProductService productService;
    private final BrandService brandService;
    private final CategoryService categoryService;
    public ProductDetailController(ProductDetailService productDetailService, ProductService productService, BrandService brandService, CategoryService categoryService) {
        this.productDetailService = productDetailService;
        this.productService = productService;
        this.brandService = brandService;
        this.categoryService = categoryService;
    }

    @GetMapping("/by-product-id/{id}")
    public ResponseEntity<ProductDetailResponse> getProductDetailsByProductId(@PathVariable("id") int id) {
        List<ProductDetailDTO> productDetails=productDetailService.getByProductId(id);
        ProductDTO productDTO=productService.getProductById(id);

        ProductDetailResponse productDetailResponse=new ProductDetailResponse();
        productDetailResponse.setProductDetails(productDetails);
        productDetailResponse.setProductName(productDTO.getProductName());
        productDetailResponse.setBrandName(brandService.getBrandById(productDTO.getBrandID()).getName());
        productDetailResponse.setDescription(productDTO.getDescription());
        productDetailResponse.setCategoryName(categoryService.getCategory(productDTO.getCategoryID()).getName());
        productDetailResponse.setPrice(productDTO.getPrice());
        productDetailResponse.setImageURL(productDTO.getImageURL());
        return ResponseEntity.ok(productDetailResponse);
    }
    @GetMapping("/by-order-detail-id/{id}")
    public ResponseEntity<Map<String,Object>> getProductDetailsByOrderDetailId(@PathVariable("id") int id) {
        List<ProductDetailDTO> productDetails=productDetailService.getByProductId(id);
        Map<String,Object> response= new HashMap<>();
        response.put("productDetails",productDetails);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/{id}")
    public ResponseEntity<ProductDetailDTO> getProductDetailsById(@PathVariable int id) {
        ProductDetailDTO productDetail=productDetailService.getProductDetailById(id);
        if (productDetail != null) {
            return ResponseEntity.ok(productDetail);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }


}
