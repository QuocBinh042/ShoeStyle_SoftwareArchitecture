package com.shoestore.Server.service.impl;

import com.shoestore.Server.dto.request.OrderDTO;
import com.shoestore.Server.dto.request.ReviewDTO;
import com.shoestore.Server.entities.Order;
import com.shoestore.Server.entities.ProductDetail;
import com.shoestore.Server.entities.Review;
import com.shoestore.Server.entities.Voucher;
import com.shoestore.Server.mapper.OrderMapper;
import com.shoestore.Server.mapper.ReviewMapper;
import com.shoestore.Server.repositories.*;
import com.shoestore.Server.service.ReviewService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {
    private final ReviewRepository reviewRepository;
    private final ReviewMapper reviewMapper;
    private final OrderRepository orderRepository;
    private final ProductDetailRepository productDetailRepository;
    public ReviewServiceImpl(ReviewRepository reviewRepository, ReviewMapper reviewMapper, OrderRepository orderRepository, ProductDetailRepository productDetailRepository) {
        this.reviewRepository = reviewRepository;
        this.reviewMapper = reviewMapper;
        this.orderRepository = orderRepository;
        this.productDetailRepository = productDetailRepository;
    }

    @Override
    public ReviewDTO getReview(int id) {
        return null;
    }

    @Override
    public List<ReviewDTO> getReviewByProductId(int productId) {
        List<Review> reviews=reviewRepository.findReviewsByProductID(productId);
        return reviewMapper.toDtoList(reviews);
    }

    @Override
    public ReviewDTO addReview(ReviewDTO reviewDTO) {
        Review review=reviewMapper.toEntity(reviewDTO);
        Order order = orderRepository.findById(reviewDTO.getOrder().getOrderID())
                .orElseThrow(() -> new IllegalArgumentException("Order not found"));
        ProductDetail productDetail1 = productDetailRepository.findById(reviewDTO.getProductDetail().getProductDetailID())
                .orElseThrow(() -> new IllegalArgumentException("Product detail not found"));
        review.setOrder(order);
        review.setProductDetail(productDetail1);
        return reviewMapper.toDto(reviewRepository.save(review));
    }
}
