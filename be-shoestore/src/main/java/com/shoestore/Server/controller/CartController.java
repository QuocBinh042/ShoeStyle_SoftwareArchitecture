package com.shoestore.Server.controller;

import com.shoestore.Server.entities.*;
import com.shoestore.Server.service.CartItemService;
import com.shoestore.Server.service.CartService;
import com.shoestore.Server.service.ProductDetailService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class CartController {

  private final CartItemService cartItemService;
  private final CartService cartService;

  public CartController(CartItemService cartItemService, CartService cartService1) {
      this.cartItemService = cartItemService;
      this.cartService = cartService1;
  }
  @GetMapping("/cart/{id}")
  public ResponseEntity<Cart> getCartByCartId(@PathVariable int id) {
    Cart cart= cartService.getCartByUserId(id);
    return ResponseEntity.ok(cart);
  }
  @GetMapping("/cart-item/{cart-id}")
  public ResponseEntity<Map<String, Object>> getCartItemsByCartId(@PathVariable("cart-id") int id,
  @RequestParam(defaultValue = "1") int page,
  @RequestParam(defaultValue = "3") int pageSize) {
    List<CartItem> cartItems = cartItemService.getCartItemsByCartId(id);
    int total = cartItems.size();
    List<CartItem> paginatedCartItems =cartItemService.getCartItemByPage(cartItems,page,pageSize);
    Map<String, Object> response = new HashMap<>();
    response.put("cartItems", paginatedCartItems);
    response.put("total", total);
    return ResponseEntity.ok(response);
  }
  @GetMapping("/cart-item/{cart-id}/{product-detail-id}")
  public ResponseEntity<CartItem> getCartItemById(@PathVariable("cart-id") int cartId,
                                                  @PathVariable("product-detail-id") int productDetailId) {
    CartItemKey cartItemKey = new CartItemKey(cartId, productDetailId);
    CartItem cartItem = cartItemService.getCartItemById(cartItemKey);

    if (cartItem != null) {
      return ResponseEntity.ok(cartItem);
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
  }
  @PutMapping("/cart-item/update/{cart-id}/{product-detail-id}")
  public ResponseEntity<CartItem> updateCartItem(@PathVariable("cart-id") int cartId,
                                                 @PathVariable("product-detail-id") int productDetailId,
                                                @RequestBody CartItem cartItem) {
    CartItemKey cartItemKey = new CartItemKey(cartId, productDetailId);
    CartItem cartItemUpdate= cartItemService.updateQuantity(cartItemKey,cartItem);
    if (cartItemUpdate != null) {
      return ResponseEntity.ok(cartItemUpdate);
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }
  @DeleteMapping("/cart-item/delete/{cart-id}/{product-detail-id}")
  public ResponseEntity<String> deleteVoucher(@PathVariable("cart-id") int cartId,
                                              @PathVariable("product-detail-id") int productDetailId) {
    CartItemKey cartItemKey = new CartItemKey(cartId, productDetailId);
    cartItemService.deleteCartItem(cartItemKey);
    return ResponseEntity.ok("CarItem deleted");
  }

  @PostMapping("/cart-item/add")
  public ResponseEntity<?> addCartItem(@RequestBody CartItem cartItem) {
    try {
      CartItem savedCartItem = cartItemService.addCartItem(cartItem);
      return ResponseEntity.ok(savedCartItem);
    } catch (Exception e) {
      return ResponseEntity.badRequest().body("Error: " + e.getMessage());
    }
  }


}

