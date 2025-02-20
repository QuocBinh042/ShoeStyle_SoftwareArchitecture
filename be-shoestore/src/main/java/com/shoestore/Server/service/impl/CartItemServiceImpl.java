package com.shoestore.Server.service.impl;

import com.shoestore.Server.dto.request.CartItemDTO;
import com.shoestore.Server.dto.response.CartItemResponse;
import com.shoestore.Server.dto.response.PaginationResponse;
import com.shoestore.Server.entities.Cart;
import com.shoestore.Server.entities.CartItem;
import com.shoestore.Server.entities.CartItemKey;
import com.shoestore.Server.entities.ProductDetail;
import com.shoestore.Server.mapper.CartItemMapper;
import com.shoestore.Server.mapper.ProductDetailMapper;
import com.shoestore.Server.mapper.ProductMapper;
import com.shoestore.Server.repositories.CartItemRepository;
import com.shoestore.Server.repositories.CartRepository;
import com.shoestore.Server.repositories.ProductDetailRepository;
import com.shoestore.Server.service.CartItemService;
import com.shoestore.Server.service.PromotionService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.shoestore.Server.service.PaginationService;
import java.util.Optional;

@Service
public class CartItemServiceImpl implements CartItemService {
    private final ProductDetailRepository productDetailRepository;
    private final CartItemRepository cartItemRepository;
    private final CartRepository cartRepository;
    private final PaginationService paginationService ;
    private final CartItemMapper cartItemMapper;
    private final ProductDetailMapper productDetailMapper;
    private final PromotionService promotionService;
    private final ProductMapper productMapper;
    public CartItemServiceImpl(ProductDetailRepository productDetailRepository, CartItemRepository cartItemRepository, CartRepository cartRepository, PaginationService paginationService, CartItemMapper cartItemMapper, ProductDetailMapper productDetailMapper, PromotionService promotionService, ProductMapper productMapper) {
        this.productDetailRepository = productDetailRepository;
        this.cartItemRepository = cartItemRepository;
        this.cartRepository = cartRepository;
        this.paginationService = paginationService;
        this.cartItemMapper = cartItemMapper;
        this.productDetailMapper = productDetailMapper;
        this.promotionService = promotionService;
        this.productMapper = productMapper;
    }
    @Override
    public PaginationResponse<CartItemResponse> getCartItemsByCartId(int cartId, int page, int pageSize) {
        Pageable pageable = paginationService.createPageable(page, pageSize);

        Page<CartItem> cartItemsPage = cartItemRepository.findCartItemsByCartId(cartId, pageable);

        Page<CartItemResponse> cartItemResponses = cartItemsPage.map(cartItem -> {
            ProductDetail productDetail = cartItem.getProductDetail();
            CartItemResponse cartItemResponse = new CartItemResponse();
            cartItemResponse.setCartItemDTO(cartItemMapper.toCartItemDTO(cartItem));
            cartItemResponse.setProductName(productDetail.getProduct().getProductName());
            cartItemResponse.setProductDetailDTO(productDetailMapper.toDto(productDetail));
            cartItemResponse.setProductPrice(promotionService.getDiscountedPrice(productMapper.toDto(productDetail.getProduct())));
            return cartItemResponse;
        });
        return paginationService.paginate(cartItemResponses);
    }

    @Override
    public CartItemDTO addCartItem(CartItem cartItem) {
        Cart cart = cartRepository.findById(cartItem.getId().getCartId())
                .orElseThrow(() -> new IllegalArgumentException("Cart not found"));
        ProductDetail productDetail = productDetailRepository.findById(cartItem.getId().getProductDetailId())
                .orElseThrow(() -> new IllegalArgumentException("ProductDetail not found"));

        CartItemKey cartItemKey = new CartItemKey(cart.getCartID(), productDetail.getProductDetailID());
        cartItem.setId(cartItemKey);

        cartItem.setCart(cart);
        cartItem.setProductDetail(productDetail);
        CartItem savedCartItem = cartItemRepository.save(cartItem);

        return cartItemMapper.toCartItemDTO(savedCartItem);
    }

    @Override
    public CartItemDTO getCartItemById(CartItemKey cartItemKey) {
        CartItem cartItem = cartItemRepository.findById(cartItemKey).orElse(null);
        return cartItem != null ? cartItemMapper.toCartItemDTO(cartItem) : null;
    }

    @Override
    public CartItemDTO updateQuantity(CartItemKey id, CartItem cartItem) {
        Optional<CartItem> existCartItem = cartItemRepository.findById(id);
        if (existCartItem.isPresent()) {
            CartItem entityCartItem = existCartItem.get();

            entityCartItem.setQuantity(cartItem.getQuantity());
            entityCartItem.setCart(cartItem.getCart());
            entityCartItem.setProductDetail(cartItem.getProductDetail());
            entityCartItem.setSubTotal(cartItem.getSubTotal());

            CartItem savedCartItem = cartItemRepository.save(entityCartItem);
            return cartItemMapper.toCartItemDTO(savedCartItem);
        }
        return null;
    }

    @Override
    public void deleteCartItem(CartItemKey id) {
        Optional<CartItem> cartItem = cartItemRepository.findById(id);
        if (cartItem.isPresent()) {
            cartItemRepository.deleteById(id);
        } else {
            throw new EntityNotFoundException("Cart item not found with id: " + id);
        }
    }
}
