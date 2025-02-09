package com.shoestore.Server.service.impl;

import com.shoestore.Server.dto.UserDTO;
import com.shoestore.Server.entities.Role;
import com.shoestore.Server.entities.User;
import com.shoestore.Server.repositories.RoleRepository;
import com.shoestore.Server.repositories.UserRepository;
import com.shoestore.Server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public List<User> getUserByName(String username) {
        return List.of();
    }



    @Override
    public User addUserByRegister(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email already exists.");
        }

        Role role = roleRepository.findByName("Customer")
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Cannot find role 'Customer'."));

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(role);
        user.setStatus("Active");

        return userRepository.save(user);
    }



    @Override
    public void deleteUser(int userID) {
        // Kiểm tra xem người dùng có tồn tại không
        if (!userRepository.existsById(userID)) {
            throw new IllegalArgumentException("User with ID " + userID + " does not exist.");
        }
        userRepository.deleteById(userID);
    }
    @Override
    public List<User> searchUsers(String name, String roleName, String status) {
        name = (name != null && !name.isEmpty()) ? name : null;
        roleName = (roleName != null && !roleName.isEmpty()) ? roleName : null;
        status = (status != null && !status.isEmpty()) ? status : null;

        return userRepository.searchUsers(name, roleName, status);
    }

    @Override
    public User updateUser(int id, User updatedUser) {
        User existingUser = userRepository.findById(id).orElse(null);

        if (existingUser == null) {
            return null;
        }
        existingUser.setName(existingUser.getName());
        existingUser.setUserName(updatedUser.getUserName());
        existingUser.setPassword(existingUser.getPassword());
        existingUser.setPhoneNumber(updatedUser.getPhoneNumber());
        existingUser.setEmail(existingUser.getEmail());
        existingUser.setStatus(existingUser.getStatus());
        existingUser.setCI(updatedUser.getCI());

        if (updatedUser.getRole() != null) {
            Role role = roleRepository.findById(updatedUser.getRole().getRoleID()).orElse(null);
            if (role != null) {
                existingUser.setRole(role);
            }
        }
        return userRepository.save(existingUser);
    }
    @Override
    public User findById(int id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public User getUserById(int id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User findUserById(int id) {
        return userRepository.findById(id).orElse(null);
    }
}
