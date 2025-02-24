package com.shoestore.Server.controller;

import com.shoestore.Server.dto.request.CartDTO;
import com.shoestore.Server.dto.request.CartItemDTO;
import com.shoestore.Server.dto.response.ApiStatusResponse;
import com.shoestore.Server.dto.response.PaginationResponse;
import com.shoestore.Server.dto.response.RestResponse;
import com.shoestore.Server.dto.response.CartItemResponse;
import com.shoestore.Server.service.CartItemService;
import com.shoestore.Server.service.CartService;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
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
  public ResponseEntity<RestResponse<CartDTO>> getCartByCartId(@PathVariable int id) {
    log.info("Fetching cart for user id: {}", id);
    try {
      CartDTO cart = cartService.getCartByUserId(id);
      return ResponseEntity.ok(new RestResponse<>(ApiStatusResponse.SUCCESS, cart));
    } catch (Exception e) {
      log.error("Error fetching cart: {}", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
              .body(new RestResponse<>(ApiStatusResponse.INTERNAL_SERVER_ERROR, e.getMessage()));
    }
  }

  @GetMapping("/cart-item/{cart-id}")
  public ResponseEntity<RestResponse<PaginationResponse<CartItemResponse>>> getCartItemsByCartId(
          @PathVariable("cart-id") int cartId,
          @RequestParam(defaultValue = "1") int page,
          @RequestParam(defaultValue = "3") int pageSize) {
    try {
      PaginationResponse<CartItemResponse> cartItemsResponse = cartItemService.getCartItemsByCartId(cartId, page, pageSize);
      return ResponseEntity.ok(new RestResponse<>(ApiStatusResponse.SUCCESS, cartItemsResponse));
    } catch (Exception e) {
      log.error("Error fetching cart items: {}", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
              .body(new RestResponse<>(ApiStatusResponse.INTERNAL_SERVER_ERROR, e.getMessage()));
    }
  }

  @GetMapping("/cart-item/{id}")
  public ResponseEntity<RestResponse<CartItemDTO>> getCartItemById(@PathVariable int id) {
    log.info("Fetching cart item by id: {}", id);
    try {
      CartItemDTO cartItem = cartItemService.getCartItemById(id);
      return ResponseEntity.ok(new RestResponse<>(ApiStatusResponse.SUCCESS, cartItem));
    } catch (EntityNotFoundException e) {
      log.error("CartItem not found: {}", e.getMessage());
      return ResponseEntity.status(HttpStatus.NOT_FOUND)
              .body(new RestResponse<>(ApiStatusResponse.NOT_FOUND, "Cart item not found"));
    }
  }

  @PutMapping("/cart-item/{id}")
  public ResponseEntity<RestResponse<CartItemDTO>> updateCartItem(@PathVariable int id,
                                                                  @RequestBody CartItemDTO cartItemDTO) {
    log.info("Updating cart item for id: {}", id);
    try {
      CartItemDTO updatedCartItem = cartItemService.updateQuantity(id, cartItemDTO);
      return ResponseEntity.ok(new RestResponse<>(ApiStatusResponse.SUCCESS, updatedCartItem));
    } catch (EntityNotFoundException e) {
      log.error("CartItem not found: {}", e.getMessage());
      return ResponseEntity.status(HttpStatus.NOT_FOUND)
              .body(new RestResponse<>(ApiStatusResponse.NOT_FOUND, "Cart item not found"));
    }
  }

  @DeleteMapping("/cart-item/{id}")
  public ResponseEntity<RestResponse<String>> deleteCartItem(@PathVariable int id) {
    log.info("Deleting cart item for id: {}", id);
    try {
      cartItemService.deleteCartItem(id);
      return ResponseEntity.ok(new RestResponse<>(ApiStatusResponse.SUCCESS, "Cart item deleted successfully"));
    } catch (EntityNotFoundException e) {
      log.error("CartItem not found: {}", e.getMessage());
      return ResponseEntity.status(HttpStatus.NOT_FOUND)
              .body(new RestResponse<>(ApiStatusResponse.NOT_FOUND, "Cart item not found"));
    } catch (Exception e) {
      log.error("Unexpected error while deleting cart item: {}", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
              .body(new RestResponse<>(ApiStatusResponse.INTERNAL_SERVER_ERROR, "Unexpected error occurred while removing item"));
    }
  }

  @PostMapping("/cart-item/add")
  public ResponseEntity<RestResponse<CartItemDTO>> addCartItem(@RequestBody CartItemDTO cartItemDTO) {
    log.info("Adding cart item: {}", cartItemDTO);
    try {
      CartItemDTO savedCartItem = cartItemService.addCartItem(cartItemDTO);
      return ResponseEntity.status(HttpStatus.CREATED)
              .body(new RestResponse<>(ApiStatusResponse.CREATED, savedCartItem));
    } catch (Exception e) {
      log.error("Error adding cart item: {}", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
              .body(new RestResponse<>(ApiStatusResponse.INTERNAL_SERVER_ERROR, e.getMessage()));
    }
  }
}
