package com.shoestore.Server.service;


import com.shoestore.Server.entities.Cart;
import com.shoestore.Server.entities.CartItem;
import com.shoestore.Server.entities.CartItemKey;

import java.util.List;

public interface CartItemService {
  List<CartItem> getCartItemsByCartId(int cartId);
  CartItem addCartItem(CartItem cartItem);
  CartItem getCartItemById(CartItemKey cartItemKey);
  CartItem updateQuantity(CartItemKey id,CartItem cartItem);
  void deleteCartItem(CartItemKey id);
  List<CartItem> getCartItemByPage(List<CartItem> cartItems,int page,int pageSize);
}

