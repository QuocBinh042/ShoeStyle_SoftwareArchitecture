package com.shoestore.Server.controller;

import com.shoestore.Server.dto.request.OrderDTO;
import com.shoestore.Server.service.MailService;
import com.shoestore.Server.service.OrderService;
import com.shoestore.Server.service.UserService;
import com.shoestore.Server.service.VoucherService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    private OrderService orderService;
    @Autowired
    private UserService userService;
    @Autowired
    private VoucherService voucherService;
    @Autowired
    private MailService mailService;

    @PostMapping("/add")
    public ResponseEntity<OrderDTO> createBasicOrder(@RequestBody OrderDTO orderDTO) {
        System.out.println(orderDTO);
        OrderDTO newOrderDTO = orderService.addOrder(orderDTO);
        return ResponseEntity.ok(newOrderDTO);
    }

    @PostMapping("/mail-confirm")
    public ResponseEntity<String> sendEmail(@RequestParam String to, @RequestParam String subject, @RequestParam String text) {
        try {
            mailService.sendOrderConfirmation(to, subject, text);
            return ResponseEntity.ok("Email sent successfully!");
        } catch (MessagingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send email: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDTO> getOrderById(@PathVariable("id") int id) {
        OrderDTO orderDTO = orderService.getOrderById(id);
        return ResponseEntity.ok(orderDTO);
    }

    @PostMapping("/update-status")
    public ResponseEntity<String> updateOrderStatus(@RequestBody Map<String, Object> payload) {
        try {
            int orderId;
            Object orderIdObj = payload.get("orderId");
            if (orderIdObj instanceof Integer) {
                orderId = (Integer) orderIdObj;
            } else if (orderIdObj instanceof Number) {
                orderId = ((Number) orderIdObj).intValue();
            } else {
                return ResponseEntity.badRequest().body("orderId không hợp lệ!");
            }
            String status = (String) payload.get("status");
            if (status == null || status.isEmpty()) {
                return ResponseEntity.badRequest().body("status không hợp lệ!");
            }
            orderService.updateOrderStatus(orderId, status);
            return ResponseEntity.ok("Cập nhật trạng thái thành công!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Cập nhật thất bại: " + e.getMessage());
        }
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<OrderDTO>> getAllOrders() {
        List<OrderDTO> orders = orderService.getAll();
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/by-user-id/{user-id}")
    public ResponseEntity<List<OrderDTO>> getOrdersByUserId(@PathVariable("user-id") int userId) {
        try {
            List<OrderDTO> orders = orderService.getOrderByByUser(userId);
            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/count/{user-id}")
    public ResponseEntity<Integer> countUserOrders(@PathVariable("user-id") int id) {
        int count = orderService.getOrderQuantityByUserId(id);
        return ResponseEntity.ok(count);
    }

    @GetMapping("/total-spent/{user-id}")
    public ResponseEntity<Double> getTotalSpent(@PathVariable("user-id") int id) {
        double totalSpent = orderService.getTotalAmountByUserId(id);
        return ResponseEntity.ok(totalSpent);
    }
}