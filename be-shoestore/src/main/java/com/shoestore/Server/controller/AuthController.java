package com.shoestore.Server.controller;

import com.shoestore.Server.dto.request.LoginRequest;
import com.shoestore.Server.dto.request.UserDTO;
import com.shoestore.Server.dto.response.AuthResponse;
import com.shoestore.Server.dto.response.LoginResponse;
import com.shoestore.Server.exception.UserNotActiveException;
import com.shoestore.Server.security.CustomUserDetailsService;
import com.shoestore.Server.service.UserService;
import com.shoestore.Server.security.JwtUtils;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.security.core.*;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
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
    @Value("${jwt.expiration}")
    private long accessExpirationMs;

    @Value("${jwt.refreshExpiration}")
    private long refreshExpirationMs;
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        try {

            UserDetails userDetails = customUserDetailsService.loadUserByUsername(loginRequest.getEmail());
            if (!passwordEncoder.matches(loginRequest.getPassword(), userDetails.getPassword())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Collections.singletonMap("message", "Password is invalid"));
            }
            UserDTO  userDB= userService.findByEmail(loginRequest.getEmail());
            LoginResponse loginResponse = new LoginResponse();
            if (userDB != null && userDB.getStatus().equals("Active")) {
                LoginResponse.UserLogin user = new LoginResponse.UserLogin(
                        userDB.getUserID(),
                        userDB.getEmail(),
                        userDB.getPhoneNumber(),
                        userDB.getName(),
                        userDB.getRole()
                );
                loginResponse.setUser(user);
            } else {
                throw new UserNotActiveException("User is not activated");
            }

            String accessToken = jwtUtil.createAccessToken(loginResponse.getUser().getEmail(),loginResponse);
            loginResponse.setAccessToken(accessToken);
            String refreshToken = jwtUtil.createRefreshToken(loginResponse.getUser().getEmail(), loginResponse);

            userService.updateRefreshToken(loginRequest.getEmail(), refreshToken);

            ResponseCookie cookie = ResponseCookie.from("refresh_token", refreshToken)
                    .httpOnly(true).path("/")
                    .secure(true)
                    .maxAge(refreshExpirationMs)
                    .build();
            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, cookie.toString())
                    .body(loginResponse);

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
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        Cookie accessTokenCookie = new Cookie("accessToken", null);
        accessTokenCookie.setHttpOnly(true);
        accessTokenCookie.setSecure(true);
        accessTokenCookie.setPath("/");
        accessTokenCookie.setMaxAge(0);

        Cookie refreshTokenCookie = new Cookie("refreshToken", null);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(true);
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setMaxAge(0);

        response.addCookie(accessTokenCookie);
        response.addCookie(refreshTokenCookie);

        return ResponseEntity.ok(Collections.singletonMap("message", "Logged out successfully"));
    }
    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@CookieValue(value = "refresh_token", defaultValue = "") String refreshToken) throws UserNotActiveException {
        if (refreshToken.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing refresh token.");
        }
System.out.println("Nhana: "+refreshToken);
        Optional<Claims> claimsOpt = jwtUtil.checkValidJWTRefreshToken(refreshToken);
        if (claimsOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired refresh token.");
        }

        String email = claimsOpt.get().getSubject();
        UserDTO  userDB= userService.findByEmail(email);
        LoginResponse loginResponse = new LoginResponse();
        if (userDB != null && userDB.getStatus().equals("Active")) {
            LoginResponse.UserLogin user = new LoginResponse.UserLogin(
                    userDB.getUserID(),
                    userDB.getEmail(),
                    userDB.getPhoneNumber(),
                    userDB.getName(),
                    userDB.getRole()
            );
            loginResponse.setUser(user);
        } else {
            throw new UserNotActiveException("User is not activated");
        }

        String accessToken = jwtUtil.createAccessToken(loginResponse.getUser().getEmail(),loginResponse);
        loginResponse.setAccessToken(accessToken);
        String newRefreshToken = jwtUtil.createRefreshToken(loginResponse.getUser().getEmail(), loginResponse);

        userService.updateRefreshToken(userDB.getEmail(), newRefreshToken);

        ResponseCookie cookie = ResponseCookie.from("refresh_token", newRefreshToken)
                .httpOnly(true).path("/")
                .secure(true)
                .maxAge(refreshExpirationMs)
                .build();
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(loginResponse);


    }

}
