package com.shoestore.Server.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class RestResponse<T> {
    private int statusCode;
    private String message;
    private String error;
    private T data;
    public RestResponse(ApiStatusResponse status, T data) {
        this.statusCode = status.getCode();
        this.message = status.getMessage();
        this.error = null;
        this.data = data;
    }

    public RestResponse(ApiStatusResponse status, String errorMessage) {
        this.statusCode = status.getCode();
        this.message = status.getMessage();
        this.error = errorMessage;
        this.data = null;
    }
}
