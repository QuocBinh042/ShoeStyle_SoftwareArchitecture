package com.shoestore.Server.service.impl;

import com.shoestore.Server.dto.request.CartDTO;
import com.shoestore.Server.dto.request.CategoryDTO;
import com.shoestore.Server.entities.Cart;
import com.shoestore.Server.entities.Category;
import com.shoestore.Server.mapper.CartMapper;
import com.shoestore.Server.repositories.CartRepository;
import com.shoestore.Server.service.CartService;
import org.springframework.stereotype.Service;

@Service
public class CartServiceImpl implements CartService {
    private final CartRepository cartRepository;
    private final CartMapper cartMapper;
    public CartServiceImpl(CartRepository cartRepository, CartMapper cartMapper) {
        this.cartRepository = cartRepository;
        this.cartMapper = cartMapper;
    }

    @Override
    public CartDTO getCartByUserId(int id) {
        Cart cart=cartRepository.findCartByUserId(id);
        return cartMapper.toDto(cart);
    }
}
