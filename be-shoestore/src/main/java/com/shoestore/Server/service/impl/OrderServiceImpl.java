package com.shoestore.Server.service.impl;

import com.shoestore.Server.dto.request.OrderDTO;
import com.shoestore.Server.dto.request.PaymentDTO;
import com.shoestore.Server.entities.Order;
import com.shoestore.Server.entities.User;
import com.shoestore.Server.entities.Voucher;
import com.shoestore.Server.mapper.OrderMapper;
import com.shoestore.Server.repositories.OrderRepository;
import com.shoestore.Server.repositories.VoucherRepository;
import com.shoestore.Server.service.OrderService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;
    private final VoucherRepository voucherRepository;
    public OrderServiceImpl(OrderRepository orderRepository, OrderMapper orderMapper, VoucherRepository voucherRepository) {
        this.orderRepository = orderRepository;
        this.orderMapper = orderMapper;
        this.voucherRepository = voucherRepository;
    }
    @Override
    public List<OrderDTO> getAll() {
        return orderRepository.findAll()
                .stream()
                .map(orderMapper::toDto)
                .collect(Collectors.toList());
    }
    @Override
    public void updateOrderStatus(int orderId, String status) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if (optionalOrder.isEmpty()) {
            throw new IllegalArgumentException("Không tìm thấy đơn hàng với ID: " + orderId);
        }
        Order order = optionalOrder.get();
        order.setStatus(status);
        orderRepository.save(order);
    }

    @Override
    public OrderDTO getOrderById(int orderId) {
        return orderRepository.findById(orderId)
                .map(orderMapper::toDto)
                .orElse(null);
    }

    @Override
    public OrderDTO addOrder(OrderDTO orderDTO) {
        Voucher voucher=voucherRepository.findById(orderDTO.getVoucher().getVoucherID())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Order order = orderMapper.toEntity(orderDTO);
        order.setVoucher(voucher);
        Order savedOrder = orderRepository.save(order);
        return orderMapper.toDto(savedOrder);
    }

    @Override
    public List<OrderDTO> getOrderByByUser(int userId) {
        return orderRepository.findByUser_UserID(userId)
                .stream()
                .map(orderMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public OrderDTO getOrderByCode(String code) {
        Order order = orderRepository.findByCode(code);
        return order != null ? orderMapper.toDto(order) : null;
    }

    @Override
    public int getOrderQuantityByUserId(int id) {
        return orderRepository.countOrdersByUserId(id);
    }

    @Override
    public Double getTotalAmountByUserId(int id) {
        Double total = orderRepository.sumTotalAmountByUserId(id);
        return total != null ? total : 0.0;
    }
}
