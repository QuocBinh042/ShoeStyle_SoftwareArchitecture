package com.shoestore.Server.controller;

import com.shoestore.Server.entities.Address;
import com.shoestore.Server.entities.Cart;
import com.shoestore.Server.entities.CartItem;
import com.shoestore.Server.entities.CartItemKey;
import com.shoestore.Server.service.AddressService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/address")
public class AddressController {
    private final AddressService addressService;

    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }
    @GetMapping("/by-user-id/{id}")
    public ResponseEntity<List<Address>> getAddressByUserId(@PathVariable int id) {
        List<Address> addresses=addressService.getAddressByUserId(id);
        return ResponseEntity.ok(addresses);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Address> getAddressById(@PathVariable int id) {
        Address address=addressService.getById(id);
        return ResponseEntity.ok(address);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteAddress(@PathVariable("id") int id) {
        addressService.deleteById(id);
        return ResponseEntity.ok("Address deleted");
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<Address> updateCartItem(@PathVariable("id") int id,
                                                   @RequestBody Address address) {
        Address addressUpdate= addressService.update(id,address);
        if (addressUpdate != null) {
            return ResponseEntity.ok(addressUpdate);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    @PostMapping("/add")
    public ResponseEntity<?> addAddress(@RequestBody Address address) {
        try {
           Address savedAddress=addressService.add(address);
            return ResponseEntity.ok(savedAddress);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}
