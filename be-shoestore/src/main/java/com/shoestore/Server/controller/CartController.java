package com.shoestore.Server.controller;

import com.shoestore.Server.entities.*;
import com.shoestore.Server.service.CartItemService;
import com.shoestore.Server.service.CartService;
import com.shoestore.Server.service.ProductDetailService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CartController {

  private final CartItemService cartItemService;
  private final CartService cartService;
private final ProductDetailService productDetailService;

  public CartController(CartItemService cartService, CartItemService cartItemService, CartService cartService1, ProductDetailService productDetailService) {
      this.cartItemService = cartItemService;
      this.cartService = cartService1;
      this.productDetailService = productDetailService;
  }
  @GetMapping("/cart/{id}")
  public ResponseEntity<Cart> getCartByCartId(@PathVariable int id) {
    Cart cart= cartService.getCartByUserId(id);
    return ResponseEntity.ok(cart);
  }
  @GetMapping("/cart-item/{cart-id}")
  public ResponseEntity<List<CartItem>> getCartItemsByCartId(@PathVariable("cart-id") int id ) {
    List<CartItem> cartItems = cartItemService.getCartItemsByCartId(id);
    return ResponseEntity.ok(cartItems);
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
  @PutMapping("/update/{cartId}/{productDetailId}")
  public ResponseEntity<CartItem> updateCartItem(@PathVariable("cartId") int cartId,
                                                 @PathVariable("productDetailId") int productDetailId,
                                                @RequestBody CartItem cartItem) {
    CartItemKey cartItemKey = new CartItemKey(cartId, productDetailId);
    CartItem cartItemUpdate= cartItemService.updateQuantity(cartItemKey,cartItem);
    System.out.println(cartItemUpdate);
    if (cartItemUpdate != null) {
      return ResponseEntity.ok(cartItemUpdate);  // Trả về voucher đã được cập nhật
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();  // Nếu không tìm thấy voucher
    }
  }
  @DeleteMapping("/delete/{cartId}/{productDetailId}")
  public ResponseEntity<String> deleteVoucher(@PathVariable("cartId") int cartId,
                                              @PathVariable("productDetailId") int productDetailId) {
    System.out.println(cartId);
    CartItemKey cartItemKey = new CartItemKey(cartId, productDetailId);
    cartItemService.deleteCartItem(cartItemKey);
    System.out.println("CarItem deleted  : ");
    return ResponseEntity.ok("CarItem deleted");
  }

  @PostMapping("/add")
  public ResponseEntity<?> addCartItem(@RequestBody CartItem cartItem) {
    try {
      CartItem savedCartItem = cartItemService.addCartItem(cartItem);
      return ResponseEntity.ok(savedCartItem);
    } catch (Exception e) {
      return ResponseEntity.badRequest().body("Error: " + e.getMessage());
    }
  }


}

