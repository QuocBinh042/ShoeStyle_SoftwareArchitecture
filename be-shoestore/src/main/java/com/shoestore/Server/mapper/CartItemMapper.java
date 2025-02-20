package com.shoestore.Server.mapper;


import com.shoestore.Server.dto.request.CartItemDTO;
import com.shoestore.Server.entities.CartItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CartItemMapper {

    @Mapping(source = "id.cartId", target = "cartId")
    @Mapping(source = "id.productDetailId", target = "productDetailId")
    CartItemDTO toCartItemDTO(CartItem entity);

    @Mapping(source = "cartId", target = "id.cartId")
    @Mapping(source = "productDetailId", target = "id.productDetailId")
    CartItem toEntity(CartItemDTO dto);
}

