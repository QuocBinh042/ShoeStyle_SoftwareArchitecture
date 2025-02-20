package com.shoestore.Server.service.impl;

import com.shoestore.Server.dto.request.ProductDetailDTO;
import com.shoestore.Server.entities.Color;
import com.shoestore.Server.entities.ProductDetail;
import com.shoestore.Server.entities.Size;
import com.shoestore.Server.mapper.ProductDetailMapper;
import com.shoestore.Server.repositories.ProductDetailRepository;
import com.shoestore.Server.service.ProductDetailService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductDetailServiceImpl implements ProductDetailService {
    private final ProductDetailRepository productDetailRepository;
    private final ProductDetailMapper productDetailMapper;

    public ProductDetailServiceImpl(ProductDetailRepository productDetailRepository, ProductDetailMapper productDetailMapper) {
        this.productDetailRepository = productDetailRepository;
        this.productDetailMapper = productDetailMapper;
    }

    @Override
    public ProductDetailDTO addProductDetail(ProductDetailDTO productDetailDTO) {
        ProductDetail productDetail = productDetailMapper.toEntity(productDetailDTO);
        ProductDetail savedProductDetail = productDetailRepository.save(productDetail);
        return productDetailMapper.toDto(savedProductDetail);
    }

    @Override
    public List<ProductDetailDTO> getByProductId(int productID) {
        List<ProductDetail> productDetails = productDetailRepository.findByProduct_ProductID(productID);
        return productDetails.stream()
                .map(productDetailMapper::toDto)
                .toList();
    }

    @Override
    public ProductDetailDTO save(ProductDetailDTO productDetailDTO) {
        if (productDetailDTO == null) {
            throw new IllegalArgumentException("ProductDetail không được để trống.");
        }
        ProductDetail productDetail = productDetailMapper.toEntity(productDetailDTO);
        ProductDetail savedProductDetail = productDetailRepository.save(productDetail);
        return productDetailMapper.toDto(savedProductDetail);
    }

    @Override
    public ProductDetailDTO getProductDetailById(int id) {
        return productDetailRepository.findById(id)
                .map(productDetailMapper::toDto)
                .orElse(null);
    }

    @Override
    public ProductDetailDTO getProductDetailByProductIdAndColorAndSize(int productId, Color color, Size size) {
        ProductDetail productDetail = productDetailRepository.findOneByColorSizeAndProductId(productId, color, size);
        return productDetail != null ? productDetailMapper.toDto(productDetail) : null;
    }
}
