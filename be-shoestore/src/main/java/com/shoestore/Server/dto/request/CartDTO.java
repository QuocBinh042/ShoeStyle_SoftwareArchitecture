package com.shoestore.Server.dto.request;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CartDTO {
    private int cartID;
    private LocalDateTime createAt;
    private int userID;
}
