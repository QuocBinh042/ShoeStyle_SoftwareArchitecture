package com.shoestore.Server.controller;

import com.shoestore.Server.dto.request.ReviewDTO;
import com.shoestore.Server.dto.response.ApiStatusResponse;
import com.shoestore.Server.dto.response.RestResponse;
import com.shoestore.Server.service.ReviewService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/review")
public class ReviewController {
    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/by-product-id/{id}")
    public ResponseEntity<RestResponse<List<ReviewDTO>>> getReviewByProduct(@PathVariable int id) {
        try {
            log.info("Fetching reviews for product ID: {}", id);
            List<ReviewDTO> reviewDTOS = reviewService.getReviewByProductId(id);
            return ResponseEntity.ok(new RestResponse<>(ApiStatusResponse.SUCCESS, reviewDTOS));
        } catch (Exception e) {
            log.error("Failed to fetch reviews for product ID: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new RestResponse<>(ApiStatusResponse.INTERNAL_SERVER_ERROR, e.getMessage()));
        }
    }

    @PostMapping("/add")
    public ResponseEntity<RestResponse<ReviewDTO>> addReview(@RequestBody ReviewDTO reviewDTO) {
        try {
            log.info("Adding new review for product");
            ReviewDTO savedReview = reviewService.addReview(reviewDTO);
            return ResponseEntity.ok(new RestResponse<>(ApiStatusResponse.CREATED, savedReview));
        } catch (Exception e) {
            log.error("Failed to add review", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new RestResponse<>(ApiStatusResponse.INTERNAL_SERVER_ERROR, e.getMessage()));
        }
    }
}
