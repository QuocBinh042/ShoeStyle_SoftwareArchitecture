package com.shoestore.Server.controller;

import com.shoestore.Server.dto.request.CartDTO;
import com.shoestore.Server.dto.request.CartItemDTO;
import com.shoestore.Server.dto.response.PaginationResponse;
import com.shoestore.Server.dto.response.CartItemResponse;
import com.shoestore.Server.service.CartItemService;
import com.shoestore.Server.service.CartService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api")
public class CartController {
  private final CartItemService cartItemService;
  private final CartService cartService;

  public CartController(CartItemService cartItemService, CartService cartService) {
    this.cartItemService = cartItemService;
    this.cartService = cartService;
  }

  @GetMapping("/cart/{id}")
  public ResponseEntity<CartDTO> getCartByCartId(@PathVariable int id) {
    return ResponseEntity.ok(cartService.getCartByUserId(id));
  }

  @GetMapping("/cart-item/by-cart-id/{id}")
  public ResponseEntity<PaginationResponse<CartItemResponse>> getCartItemsByCartId(
          @PathVariable int id,
          @RequestParam(defaultValue = "1") int page,
          @RequestParam(defaultValue = "3") int pageSize) {
    return ResponseEntity.ok(cartItemService.getCartItemsByCartId(id, page, pageSize));
  }

  @GetMapping("/cart-item/{id}")
  public ResponseEntity<CartItemDTO> getCartItemById(@PathVariable int id) {
    return ResponseEntity.ok(cartItemService.getCartItemById(id));
  }

  @PutMapping("/cart-item/{id}")
  public ResponseEntity<CartItemDTO> updateCartItem(@PathVariable int id, @RequestBody CartItemDTO cartItemDTO) {
    return ResponseEntity.ok(cartItemService.updateQuantity(id, cartItemDTO));
  }

  @DeleteMapping("/cart-item/{id}")
  public ResponseEntity<Void> deleteCartItem(@PathVariable int id) {
    cartItemService.deleteCartItem(id);
    return ResponseEntity.ok().build();
  }

  @PostMapping("/cart-item/add")
  public ResponseEntity<CartItemDTO> addCartItem(@RequestBody CartItemDTO cartItemDTO) {
    return ResponseEntity.ok(cartItemService.addCartItem(cartItemDTO));
  }
}

