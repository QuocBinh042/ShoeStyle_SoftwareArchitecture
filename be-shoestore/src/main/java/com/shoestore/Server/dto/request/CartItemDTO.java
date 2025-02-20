package com.shoestore.Server.dto.request;


import lombok.Data;

@Data
public class CartItemDTO {
    private int cartId;
    private int productDetailId;
    private int quantity;
    private double subTotal;
}
