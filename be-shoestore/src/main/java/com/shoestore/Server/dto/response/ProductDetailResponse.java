package com.shoestore.Server.dto.response;

import com.shoestore.Server.dto.request.ProductDetailDTO;
import lombok.Data;

import java.util.List;

@Data
public class ProductDetailResponse {
    private List<ProductDetailDTO> productDetails;
    private String productName;
    private String categoryName;
    private String brandName;
    private String description;
    private double price;
    private List<String> imageURL;
}
