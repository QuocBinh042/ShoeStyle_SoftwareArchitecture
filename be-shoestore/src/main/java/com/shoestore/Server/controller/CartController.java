package com.shoestore.Server.controller;

import com.shoestore.Server.dto.request.CartDTO;
import com.shoestore.Server.dto.request.CartItemDTO;
import com.shoestore.Server.dto.response.CartItemResponse;
import com.shoestore.Server.dto.response.PaginationResponse;
import com.shoestore.Server.entities.CartItem;
import com.shoestore.Server.entities.CartItemKey;
import com.shoestore.Server.service.CartItemService;
import com.shoestore.Server.service.CartService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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
    CartDTO cart = cartService.getCartByUserId(id);
    return ResponseEntity.ok(cart);
  }
  @GetMapping("/cart-item/{cart-id}")
  public ResponseEntity<PaginationResponse<CartItemResponse>> getCartItemsByCartId(
          @PathVariable("cart-id") int cartId,
          @RequestParam(defaultValue = "1") int page,
          @RequestParam(defaultValue = "3") int pageSize) {
    PaginationResponse<CartItemResponse> cartItemsResponse = cartItemService.getCartItemsByCartId(cartId, page, pageSize);

    return ResponseEntity.ok(cartItemsResponse);
  }

  @GetMapping("/cart-item/{cart-id}/{product-detail-id}")
  public ResponseEntity<CartItemDTO> getCartItemById(@PathVariable("cart-id") int cartId,
                                                  @PathVariable("product-detail-id") int productDetailId) {
    CartItemDTO cartItem = cartItemService.getCartItemById(new CartItemKey(cartId, productDetailId));

    if (cartItem != null) {
      return ResponseEntity.ok(cartItem);
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
  }

  @PutMapping("/cart-item/update/{cart-id}/{product-detail-id}")
  public ResponseEntity<CartItemDTO> updateCartItem(@PathVariable("cart-id") int cartId,
                                                 @PathVariable("product-detail-id") int productDetailId,
                                                 @RequestBody CartItem cartItem) {
    CartItemDTO updatedCartItem = cartItemService.updateQuantity(new CartItemKey(cartId, productDetailId), cartItem);

    if (updatedCartItem != null) {
      return ResponseEntity.ok(updatedCartItem);
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }

  @DeleteMapping("/cart-item/delete/{cart-id}/{product-detail-id}")
  public ResponseEntity<String> deleteCartItem(@PathVariable("cart-id") int cartId,
                                               @PathVariable("product-detail-id") int productDetailId) {
    try {
      cartItemService.deleteCartItem(new CartItemKey(cartId, productDetailId));
      return ResponseEntity.ok("Cart item deleted successfully");
    } catch (EntityNotFoundException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected error occurred while removing item");
    }
  }



  @PostMapping("/cart-item/add")
  public ResponseEntity<?> addCartItem(@RequestBody CartItem cartItem) {
    try {
      CartItemDTO savedCartItem = cartItemService.addCartItem(cartItem);
      return ResponseEntity.ok(savedCartItem);
    } catch (Exception e) {
      return ResponseEntity.badRequest().body("Error: " + e.getMessage());
    }
  }
}
