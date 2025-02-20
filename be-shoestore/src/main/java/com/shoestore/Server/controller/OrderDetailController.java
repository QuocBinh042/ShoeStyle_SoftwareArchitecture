package com.shoestore.Server.controller;

import com.shoestore.Server.dto.request.OrderDTO;
import com.shoestore.Server.dto.request.OrderDetailDTO;
import com.shoestore.Server.dto.request.ProductDetailDTO;
import com.shoestore.Server.service.OrderDetailService;
import com.shoestore.Server.service.OrderService;
import com.shoestore.Server.service.ProductDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order-details")
public class OrderDetailController {

    @Autowired
    private OrderDetailService orderDetailService;
    @Autowired
    private ProductDetailService productDetailService;
    @Autowired
    private OrderService orderService;

    @GetMapping("/by-order-id/{order-id}")
    public ResponseEntity<List<OrderDetailDTO>> getOrderDetailByOrder(@PathVariable("order-id") int id) {
        try {
            List<OrderDetailDTO> orderDetails = orderDetailService.getProductDetailByOrderID(id);
            return ResponseEntity.ok(orderDetails);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<OrderDetailDTO> addOrderDetail(@RequestBody OrderDetailDTO orderDetailDTO) {
        try {
            OrderDetailDTO savedOrderDetail = orderDetailService.save(orderDetailDTO);
            return ResponseEntity.ok(savedOrderDetail);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}