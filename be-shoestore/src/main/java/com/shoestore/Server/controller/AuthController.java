package com.shoestore.Server.controller;

import com.shoestore.Server.dto.request.LoginRequest;
import com.shoestore.Server.dto.request.UserDTO;
import com.shoestore.Server.dto.response.AuthResponse;
import com.shoestore.Server.entities.User;
import com.shoestore.Server.sercurity.CustomUserDetailsService;
import com.shoestore.Server.service.UserService;
import com.shoestore.Server.sercurity.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.security.core.*;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private JwtUtils jwtUtil;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            UserDetails userDetails = customUserDetailsService.loadUserByUsername(loginRequest.getEmail());
            if (!passwordEncoder.matches(loginRequest.getPassword(), userDetails.getPassword())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Collections.singletonMap("message", "Password is invalid"));
            }

            UserDTO user = userService.findByEmail(loginRequest.getEmail());
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Collections.singletonMap("message", "Email does not exist"));
            }

            int userId = user.getUserID();
            List<String> authorities = userDetails.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList());

            String accessToken = jwtUtil.generateToken(userId, userDetails.getUsername(), authorities);
            String refreshToken = jwtUtil.generateRefreshToken(userId, userDetails.getUsername());
            return ResponseEntity.ok(new AuthResponse(accessToken, refreshToken));

        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("message", "Email does not exist"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("message", "Password or email is invalid"));
        }
    }


    @PostMapping("/sign-up")
    public ResponseEntity<?> register(@RequestBody UserDTO user) {
        try {
            UserDTO newUser = userService.addUserByRegister(user);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(Collections.singletonMap("message", "User registered successfully."));
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode())
                    .body(Collections.singletonMap("message", e.getReason()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("message", "An unexpected error occurred. Please try again."));
        }
    }
    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@RequestBody String refreshToken) {
        String username = jwtUtil.extractUsername(refreshToken);
        if (username == null || !jwtUtil.validateToken(refreshToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired refresh token.");
        }

        UserDTO user = userService.findByEmail(username);
        String newAccessToken = jwtUtil.generateToken(user.getUserID(), user.getEmail(), List.of(user.getRole().getName()));

        return ResponseEntity.ok(newAccessToken);
    }
}
