package com.shoestore.Server.controller;

import com.shoestore.Server.dto.UserDTO;
import com.shoestore.Server.entities.Role;
import com.shoestore.Server.entities.User;
import com.shoestore.Server.repositories.RoleRepository;
import com.shoestore.Server.repositories.UserRepository;
import com.shoestore.Server.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;


//    @PostMapping("/add")
//    public ResponseEntity<Map<String, Object>> addUser(@RequestBody User user) {
//        try {
//
//            User savedUser = userService.addUser(user);
//
//            // Trả về phản hồi thành công
//            Map<String, Object> response = new HashMap<>();
//            response.put("message", "User added successfully");
//            response.put("user", savedUser);
//            return ResponseEntity.ok(response); // Trả về JSON hợp lệ
//        } catch (Exception e) {
//            // Xử lý lỗi
//            Map<String, Object> errorResponse = new HashMap<>();
//            errorResponse.put("message", "Thêm user thất bại");
//            errorResponse.put("error", e.getMessage());
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
//        }
//    }

    @GetMapping("/by-user-id/{id}")
    public ResponseEntity<User> getUserById(@PathVariable int id) {
        User user = userService.getUserById(id);
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @GetMapping("/by-email")
    public ResponseEntity<?> findByEmail(@RequestParam String email) {
        User user = userService.findByEmail(email);
        if (user != null) {
            return ResponseEntity.ok(user);

        }
        return ResponseEntity.ok().body(null);
    }

    @GetMapping("/get-all")
    public ResponseEntity<?> findAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PutMapping(value = "/update/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateUser(@PathVariable int id, @RequestBody User user) {
        User existingUser = userService.getUserById(id);

        if (existingUser == null) {
            return ResponseEntity.notFound().build();
        }
        User updated = userService.updateUser(id, user);
        return ResponseEntity.ok(updated);
    }


    private User convertUserDTOToUser(UserDTO userDTO) {
        User user = new User();
        user.setName(userDTO.getName());
        user.setUserName(userDTO.getUserName());
        user.setPassword(userDTO.getPassword());
        user.setPhoneNumber(userDTO.getPhoneNumber());
        user.setEmail(userDTO.getEmail());
        user.setStatus(userDTO.getStatus());
        user.setCI(userDTO.getCi());

        // Cập nhật vai trò nếu có
        if (userDTO.getRole() != null) {
            Role role = roleRepository.findById(userDTO.getRole().getRoleID()).orElse(null);
            user.setRole(role);
        }

        return user;
    }


//
//  @PostMapping("/users/add")
//  public ResponseEntity<Map<String, Object>> addUser(@RequestBody User user) {
//    try {
//      User savedUser = userService.addUser(user);
//      Map<String, Object> response = new HashMap<>();
//      response.put("message", "User added successfully");
//      response.put("user", savedUser);
//      return ResponseEntity.ok(response); // Trả về JSON hợp lệ
//    } catch (Exception e) {
//      Map<String, Object> errorResponse = new HashMap<>();
//      errorResponse.put("message", "Thêm user thất bại");
//      errorResponse.put("error", e.getMessage());
//      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
//    }
//  }


    //	@DeleteMapping("/{id}")
//	    public ResponseEntity<String> deleteUser(@PathVariable("id") int id) {
//	    	userService.deleteUser(id);
//	        System.out.println("user deleted  : ");
//	        return ResponseEntity.ok("user deleted");
//	    }
    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") int id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getUsers(@RequestParam(required = false, defaultValue = "all") String status, @RequestParam(required = false, defaultValue = "") String search) {

        List<User> users;

        if ("all".equals(status)) {
            users = userRepository.findByNameContainingIgnoreCase(search);
        } else {
            users = userRepository.findByStatusAndNameContainingIgnoreCase(status, search);
        }

        // Chuẩn bị response trả về cho client
        Map<String, Object> response = new HashMap<>();
        response.put("users", users);  // Danh sách voucher không phân trang

        return ResponseEntity.ok(response);
    }


    @GetMapping("/users/search")
    public ResponseEntity<List<User>> searchUsers(@RequestParam(value = "name", required = false) String name, @RequestParam(value = "roleName", required = false) String roleName, @RequestParam(value = "status", required = false) String status) {
        List<User> users = userService.searchUsers(name, roleName, status);
        return ResponseEntity.ok(users); // Trả về JSON
    }


}
