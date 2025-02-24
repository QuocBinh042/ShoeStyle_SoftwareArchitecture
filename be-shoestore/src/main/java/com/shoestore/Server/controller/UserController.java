package com.shoestore.Server.controller;

import com.shoestore.Server.dto.request.UserDTO;
import com.shoestore.Server.dto.response.ApiStatusResponse;
import com.shoestore.Server.dto.response.RestResponse;
import com.shoestore.Server.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/by-user-id/{id}")
    public ResponseEntity<RestResponse<UserDTO>> getUserById(@PathVariable int id) {
        try {
            log.info("Fetching user by ID: {}", id);
            UserDTO userDTO = userService.getUserById(id);
            if (userDTO == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new RestResponse<>(ApiStatusResponse.NOT_FOUND, "User not found"));
            }
            return ResponseEntity.ok(new RestResponse<>(ApiStatusResponse.SUCCESS, userDTO));
        } catch (Exception e) {
            log.error("Failed to fetch user by ID: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new RestResponse<>(ApiStatusResponse.INTERNAL_SERVER_ERROR, e.getMessage()));
        }
    }

    @GetMapping("/by-email")
    public ResponseEntity<RestResponse<UserDTO>> findByEmail(@RequestParam String email) {
        try {
            log.info("Fetching user by email: {}", email);
            UserDTO userDTO = userService.findByEmail(email);
            if (userDTO == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new RestResponse<>(ApiStatusResponse.NOT_FOUND, "User not found"));
            }
            return ResponseEntity.ok(new RestResponse<>(ApiStatusResponse.SUCCESS, userDTO));
        } catch (Exception e) {
            log.error("Failed to fetch user by email: {}", email, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new RestResponse<>(ApiStatusResponse.INTERNAL_SERVER_ERROR, e.getMessage()));
        }
    }

    @GetMapping("/get-all")
    public ResponseEntity<RestResponse<List<UserDTO>>> findAllUsers() {
        try {
            log.info("Fetching all users");
            List<UserDTO> userDTOs = userService.getAllUsers();
            return ResponseEntity.ok(new RestResponse<>(ApiStatusResponse.SUCCESS, userDTOs));
        } catch (Exception e) {
            log.error("Failed to fetch all users", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new RestResponse<>(ApiStatusResponse.INTERNAL_SERVER_ERROR, e.getMessage()));
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<RestResponse<UserDTO>> updateUser(@PathVariable int id, @RequestBody UserDTO userDTO) {
        try {
            log.info("Updating user ID: {}", id);
            UserDTO existingUser = userService.getUserById(id);
            if (existingUser == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new RestResponse<>(ApiStatusResponse.NOT_FOUND, "User not found"));
            }
            UserDTO updatedUser = userService.updateUserInformationByUser(id, userDTO);
            return ResponseEntity.ok(new RestResponse<>(ApiStatusResponse.SUCCESS, updatedUser));
        } catch (Exception e) {
            log.error("Failed to update user ID: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new RestResponse<>(ApiStatusResponse.INTERNAL_SERVER_ERROR, e.getMessage()));
        }
    }
}
