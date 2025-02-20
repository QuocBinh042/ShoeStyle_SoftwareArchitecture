package com.shoestore.Server.service;


import com.shoestore.Server.dto.request.CartItemDTO;
import com.shoestore.Server.dto.response.CartItemResponse;
import com.shoestore.Server.dto.response.PaginationResponse;
import com.shoestore.Server.entities.Cart;
import com.shoestore.Server.entities.CartItem;
import com.shoestore.Server.entities.CartItemKey;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CartItemService {
  PaginationResponse<CartItemResponse> getCartItemsByCartId(int cartId, int page, int pageSize);
  CartItemDTO addCartItem(CartItem cartItem);
  CartItemDTO getCartItemById(CartItemKey cartItemKey);
  CartItemDTO updateQuantity(CartItemKey id,CartItem cartItem);
  void deleteCartItem(CartItemKey id);
}

