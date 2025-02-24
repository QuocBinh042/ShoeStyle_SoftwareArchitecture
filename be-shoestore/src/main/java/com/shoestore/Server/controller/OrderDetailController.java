package com.shoestore.Server.controller;

import com.shoestore.Server.dto.request.OrderDetailDTO;
import com.shoestore.Server.dto.response.ApiStatusResponse;
import com.shoestore.Server.dto.response.RestResponse;
import com.shoestore.Server.service.OrderDetailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/order-details")
public class OrderDetailController {

    private final OrderDetailService orderDetailService;

    public OrderDetailController(OrderDetailService orderDetailService) {
        this.orderDetailService = orderDetailService;
    }

    @GetMapping("/by-order-id/{orderId}")
    public ResponseEntity<RestResponse<List<OrderDetailDTO>>> getOrderDetailByOrder(@PathVariable int orderId) {
        try {
            log.info("Fetching order details for order ID: {}", orderId);
            List<OrderDetailDTO> details = orderDetailService.getProductDetailByOrderID(orderId);
            return ResponseEntity.ok(new RestResponse<>(ApiStatusResponse.SUCCESS, details));
        } catch (Exception e) {
            log.error("Failed to fetch order details for order ID: {}", orderId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new RestResponse<>(ApiStatusResponse.INTERNAL_SERVER_ERROR, e.getMessage()));
        }
    }

    @PostMapping("/add")
    public ResponseEntity<RestResponse<OrderDetailDTO>> addOrderDetail(@RequestBody OrderDetailDTO orderDetailDTO) {
        try {
            log.info("Adding new order detail: {}", orderDetailDTO);
            OrderDetailDTO savedDetail = orderDetailService.save(orderDetailDTO);
            return ResponseEntity.ok(new RestResponse<>(ApiStatusResponse.SUCCESS, savedDetail));
        } catch (Exception e) {
            log.error("Failed to add order detail", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new RestResponse<>(ApiStatusResponse.INTERNAL_SERVER_ERROR, e.getMessage()));
        }
    }
}
