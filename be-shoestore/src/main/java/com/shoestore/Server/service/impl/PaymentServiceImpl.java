package com.shoestore.Server.service.impl;

import com.shoestore.Server.entities.Payment;
import com.shoestore.Server.repositories.PaymentRepository;
import com.shoestore.Server.service.PaymentService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class PaymentServiceImpl implements PaymentService {
    private final PaymentRepository paymentRepository;

    public PaymentServiceImpl(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    @Override
    public Payment addPayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    @Override
    public Payment getPaymentById(int id) {
        return paymentRepository.findById(id).orElse(null);
    }

    @Override
    public Payment getPaymentByOrderId(int id) {
        return paymentRepository.findPaymentByOrderId(id);
    }

    @Override
    public List<Payment> getAll() {
        return paymentRepository.findAll();
    }

    @Override
    public void updateStatus(int orderId, String status) {
        Payment payment= paymentRepository.findPaymentByOrderId(orderId);
        if(payment!=null){
            payment.setStatus(status);
            payment.setPaymentDate(LocalDate.now());
            paymentRepository.save(payment);
        }
    }
}
