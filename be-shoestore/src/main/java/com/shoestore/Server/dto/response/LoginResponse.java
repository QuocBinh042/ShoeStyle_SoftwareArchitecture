package com.shoestore.Server.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.shoestore.Server.dto.request.RoleDTO;
import com.shoestore.Server.entities.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
public class LoginResponse {
    @JsonProperty("access_token")
    private String accessToken;
    private UserLogin user;


    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UserLogin {
        private int id;
        private String email;
        private String phoneNumber;
        private String name;
        private RoleDTO role;
    }


    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UserGetAccount {
        private UserLogin user;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UserInsideToken {
        private int id;
        private String email;
        private String phoneNumber;
        private String name;
    }
}
