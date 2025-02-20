package com.shoestore.Server.controller;

import com.shoestore.Server.dto.request.AddressDTO;
import com.shoestore.Server.service.AddressService;
import com.shoestore.Server.mapper.AddressMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/address")
public class AddressController {
    private final AddressService addressService;

    public AddressController(AddressService addressService) {
        this.addressService = addressService;

    }
    @GetMapping("/by-user-id/{id}")
    public ResponseEntity<List<AddressDTO>> getAddressByUserId(@PathVariable int id) {
        List<AddressDTO> addresses = addressService.getAddressByUserId(id);
        return ResponseEntity.ok(addresses);
    }
    @GetMapping("/{id}")
    public ResponseEntity<AddressDTO> getAddressById(@PathVariable int id) {
        AddressDTO address = addressService.getById(id);
        if (address != null) {
            return ResponseEntity.ok(address);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteAddress(@PathVariable("id") int id) {
        addressService.deleteById(id);
        return ResponseEntity.ok("Address deleted");
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<AddressDTO> updateAddress(@PathVariable("id") int id, @RequestBody AddressDTO addressDTO) {
        AddressDTO updatedAddress = addressService.updateAddress(id, addressDTO);
        if (updatedAddress != null) {
            return ResponseEntity.ok(updatedAddress);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    @PostMapping("/add")
    public ResponseEntity<AddressDTO> addAddress(@RequestBody AddressDTO addressDTO) {
        try {
            AddressDTO savedAddress = addressService.addAddress(addressDTO);
            return ResponseEntity.ok(savedAddress);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
