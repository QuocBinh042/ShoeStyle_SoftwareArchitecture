package com.shoestore.Server.controller;

import com.shoestore.Server.dto.request.OrderDTO;
import com.shoestore.Server.dto.response.ApiStatusResponse;
import com.shoestore.Server.dto.response.RestResponse;
import com.shoestore.Server.service.MailService;
import com.shoestore.Server.service.OrderService;
import jakarta.mail.MessagingException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/order")
public class OrderController {

    private final OrderService orderService;
    private final MailService mailService;

    public OrderController(OrderService orderService, MailService mailService) {
        this.orderService = orderService;
        this.mailService = mailService;
    }

    @PostMapping("/add")
    public ResponseEntity<RestResponse<OrderDTO>> addOrder(@RequestBody OrderDTO orderDTO) {
        try {
            log.info("Adding new order: {}", orderDTO);
            OrderDTO newOrderDTO = orderService.addOrder(orderDTO);
            return ResponseEntity.ok(new RestResponse<>(ApiStatusResponse.SUCCESS, newOrderDTO));
        } catch (Exception e) {
            log.error("Failed to add order", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new RestResponse<>(ApiStatusResponse.INTERNAL_SERVER_ERROR, e.getMessage()));
        }
    }

    @PostMapping("/mail-confirm")
    public ResponseEntity<RestResponse<String>> sendEmail(@RequestParam String to, @RequestParam String subject, @RequestParam String text) {
        try {
            log.info("Sending email to: {}, subject: {}", to, subject);
            mailService.sendOrderConfirmation(to, subject, text);
            return ResponseEntity.ok(new RestResponse<>(ApiStatusResponse.SUCCESS, "Email sent successfully!"));
        } catch (MessagingException e) {
            log.error("Failed to send email", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new RestResponse<>(ApiStatusResponse.INTERNAL_SERVER_ERROR, "Failed to send email: " + e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<RestResponse<OrderDTO>> getOrderById(@PathVariable int id) {
        try {
            log.info("Fetching order with ID: {}", id);
            OrderDTO orderDTO = orderService.getOrderById(id);
            if (orderDTO != null) {
                return ResponseEntity.ok(new RestResponse<>(ApiStatusResponse.SUCCESS, orderDTO));
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new RestResponse<>(ApiStatusResponse.NOT_FOUND, "Order not found"));
        } catch (Exception e) {
            log.error("Failed to fetch order ID: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new RestResponse<>(ApiStatusResponse.INTERNAL_SERVER_ERROR, e.getMessage()));
        }
    }

    @PostMapping("/update-status")
    public ResponseEntity<RestResponse<String>> updateOrderStatus(@RequestBody Map<String, Object> payload) {
        try {
            int orderId = ((Number) payload.get("orderId")).intValue();
            String status = (String) payload.get("status");

            if (status == null || status.isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(new RestResponse<>(ApiStatusResponse.BAD_REQUEST, "Invalid status!"));
            }

            log.info("Updating order ID {} to status: {}", orderId, status);
            orderService.updateOrderStatus(orderId, status);
            return ResponseEntity.ok(new RestResponse<>(ApiStatusResponse.SUCCESS, "Order status updated successfully!"));
        } catch (Exception e) {
            log.error("Failed to update order status", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new RestResponse<>(ApiStatusResponse.BAD_REQUEST, "Failed to update status: " + e.getMessage()));
        }
    }

    @GetMapping("/get-all")
    public ResponseEntity<RestResponse<List<OrderDTO>>> getAllOrders() {
        try {
            log.info("Fetching all orders");
            return ResponseEntity.ok(new RestResponse<>(ApiStatusResponse.SUCCESS, orderService.getAll()));
        } catch (Exception e) {
            log.error("Failed to fetch all orders", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new RestResponse<>(ApiStatusResponse.INTERNAL_SERVER_ERROR, e.getMessage()));
        }
    }

    @GetMapping("/by-user-id/{userId}")
    public ResponseEntity<RestResponse<List<OrderDTO>>> getOrdersByUserId(@PathVariable int userId) {
        try {
            log.info("Fetching orders for user ID: {}", userId);
            return ResponseEntity.ok(new RestResponse<>(ApiStatusResponse.SUCCESS, orderService.getOrderByByUser(userId)));
        } catch (Exception e) {
            log.error("Failed to fetch orders for user ID: {}", userId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new RestResponse<>(ApiStatusResponse.INTERNAL_SERVER_ERROR, e.getMessage()));
        }
    }

    @GetMapping("/count/{userId}")
    public ResponseEntity<RestResponse<Integer>> countUserOrders(@PathVariable int userId) {
        try {
            log.info("Counting orders for user ID: {}", userId);
            return ResponseEntity.ok(new RestResponse<>(ApiStatusResponse.SUCCESS, orderService.getOrderQuantityByUserId(userId)));
        } catch (Exception e) {
            log.error("Failed to count orders for user ID: {}", userId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new RestResponse<>(ApiStatusResponse.INTERNAL_SERVER_ERROR, e.getMessage()));
        }
    }

    @GetMapping("/total-spent/{userId}")
    public ResponseEntity<RestResponse<Double>> getTotalSpent(@PathVariable int userId) {
        try {
            log.info("Calculating total spent by user ID: {}", userId);
            return ResponseEntity.ok(new RestResponse<>(ApiStatusResponse.SUCCESS, orderService.getTotalAmountByUserId(userId)));
        } catch (Exception e) {
            log.error("Failed to calculate total spent for user ID: {}", userId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new RestResponse<>(ApiStatusResponse.INTERNAL_SERVER_ERROR, e.getMessage()));
        }
    }
}
