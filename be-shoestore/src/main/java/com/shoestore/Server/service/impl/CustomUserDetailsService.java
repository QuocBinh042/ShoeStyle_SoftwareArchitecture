package com.shoestore.Server.service.impl;

import com.shoestore.Server.entities.User;
import com.shoestore.Server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        User user = userRepository.findByEmail(email);
        List<SimpleGrantedAuthority> authorities = List.of(user.getRole().getName())
                .stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
        System.out.println(new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorities));
        return new org.springframework.security.core.userdetails.User(user.getUserName(), user.getPassword(), authorities);
    }
}
