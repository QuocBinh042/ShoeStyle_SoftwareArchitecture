package com.shoestore.Server.service.impl;

import com.shoestore.Server.dto.request.OrderDTO;
import com.shoestore.Server.dto.request.OrderDetailDTO;
import com.shoestore.Server.entities.Order;
import com.shoestore.Server.entities.OrderDetail;
import com.shoestore.Server.entities.ProductDetail;
import com.shoestore.Server.mapper.OrderDetailMapper;
import com.shoestore.Server.repositories.OrderDetailRepository;
import com.shoestore.Server.repositories.OrderRepository;
import com.shoestore.Server.repositories.ProductDetailRepository;
import com.shoestore.Server.service.OrderDetailService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderDetailServiceImpl implements OrderDetailService {

    private final OrderDetailRepository orderDetailRepository;
    private final OrderDetailMapper orderDetailMapper;
    private final OrderRepository orderRepository;
    private final ProductDetailRepository productDetailRepository;
    public OrderDetailServiceImpl(OrderDetailRepository orderDetailRepository, OrderDetailMapper orderDetailMapper, OrderRepository orderRepository, ProductDetailRepository productDetailRepository) {
        this.orderDetailRepository = orderDetailRepository;
        this.orderDetailMapper = orderDetailMapper;
        this.orderRepository = orderRepository;
        this.productDetailRepository = productDetailRepository;
    }

    @Override
    public OrderDetailDTO save(OrderDetailDTO orderDetailDTO) {
        Order order = orderRepository.findById(orderDetailDTO.getOrder().getOrderID())
                .orElseThrow(() -> new RuntimeException("Order not found"));
        ProductDetail productDetail = productDetailRepository.findById(orderDetailDTO.getProductDetail().getProductDetailID())
                .orElseThrow(() -> new RuntimeException("Product detail not found"));
        OrderDetail orderDetail = orderDetailMapper.toEntity(orderDetailDTO);
        orderDetail.setOrder(order);
        orderDetail.setProductDetail(productDetail);
        OrderDetail savedOrderDetail = orderDetailRepository.save(orderDetail);
        return orderDetailMapper.toDto(savedOrderDetail);
    }

    @Override
    public List<OrderDetailDTO> getProductDetailByOrderID(int orderID) {
        return orderDetailRepository.findByOrder_OrderID(orderID)
                .stream()
                .map(orderDetailMapper::toDto)
                .collect(Collectors.toList());
    }
}
