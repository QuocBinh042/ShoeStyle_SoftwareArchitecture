package com.shoestore.Server.service.impl;

import com.shoestore.Server.dto.request.PaymentDTO;
import com.shoestore.Server.entities.Order;
import com.shoestore.Server.entities.Payment;
import com.shoestore.Server.mapper.PaymentMapper;
import com.shoestore.Server.repositories.OrderRepository;
import com.shoestore.Server.repositories.PaymentRepository;
import com.shoestore.Server.service.PaymentService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PaymentServiceImpl implements PaymentService {
    private final PaymentRepository paymentRepository;
    private final PaymentMapper paymentMapper;
    private final OrderRepository orderRepository;
    public PaymentServiceImpl(PaymentRepository paymentRepository, PaymentMapper paymentMapper, OrderRepository orderRepository) {
        this.paymentRepository = paymentRepository;
        this.paymentMapper = paymentMapper;
        this.orderRepository = orderRepository;
    }

    @Override
    public PaymentDTO addPayment(PaymentDTO paymentDTO) {
        Order order = orderRepository.findById(paymentDTO.getOrder().getOrderID())
                .orElseThrow(() -> new RuntimeException("Order not found"));
        Payment payment = paymentMapper.toEntity(paymentDTO);
        payment.setOrder(order);
        Payment savedPayment = paymentRepository.save(payment);
        return paymentMapper.toDto(savedPayment);
    }

    @Override
    public PaymentDTO getPaymentById(int id) {
        return paymentRepository.findById(id)
                .map(paymentMapper::toDto)
                .orElse(null);
    }

    @Override
    public PaymentDTO getPaymentByOrderId(int id) {
        Payment payment = paymentRepository.findPaymentByOrderId(id);
        return payment != null ? paymentMapper.toDto(payment) : null;
    }

    @Override
    public List<PaymentDTO> getAll() {
        return paymentRepository.findAll()
                .stream()
                .map(paymentMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public void updateStatus(int orderId, String status) {
        Payment payment = paymentRepository.findPaymentByOrderId(orderId);
        if (payment != null) {
            payment.setStatus(status);
            payment.setPaymentDate(LocalDate.now());
            paymentRepository.save(payment);
        }
    }
}
