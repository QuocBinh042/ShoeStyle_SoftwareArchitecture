package com.shoestore.Server.controller;

import com.shoestore.Server.entities.AuthResponse;
import com.shoestore.Server.entities.LoginRequest;
import com.shoestore.Server.service.impl.CustomUserDetailsService;
import com.shoestore.Server.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest loginRequest) {
        // Xác thực người dùng dựa trên email và mật khẩu
        System.out.println(loginRequest);
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );

        // Nếu xác thực thành công, bạn có thể lấy thông tin người dùng từ đối tượng authentication
        System.out.println("Authentication details: " + authentication);

        // Lấy thông tin UserDetails từ DB bằng email
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(loginRequest.getEmail()); // Tìm bằng email thay vì userName
        System.out.println("UserDetails Username: " + userDetails.getUsername());
        System.out.println("UserDetails Authorities: " + userDetails.getAuthorities());
        // Lấy danh sách quyền (authorities) và chuyển thành List<String>
        List<String> authorities = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)  // Chuyển quyền thành String
                .collect(Collectors.toList());

        // Tạo JWT và trả về
        String token = jwtUtil.generateToken(userDetails.getUsername(), authorities);
        System.out.println("TOKEN"+token);
        return new AuthResponse(token);
    }

}
