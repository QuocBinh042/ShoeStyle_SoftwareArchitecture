package com.shoestore.Server.controller;

import com.shoestore.Server.dto.request.AddressDTO;
import com.shoestore.Server.dto.response.ApiStatusResponse;
import com.shoestore.Server.dto.response.RestResponse;
import com.shoestore.Server.service.AddressService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@Slf4j
@RestController
@RequestMapping("/api/address")
public class AddressController {
    private final AddressService addressService;

    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    @GetMapping("/by-user-id/{id}")
    public ResponseEntity<RestResponse<List<AddressDTO>>> getAddressByUserId(@PathVariable int id) {
        try {
            log.info("Fetching addresses for user ID: {}", id);
            List<AddressDTO> addresses = addressService.getAddressByUserId(id);
            return ResponseEntity.ok(new RestResponse<>(ApiStatusResponse.SUCCESS, addresses));
        } catch (Exception e) {
            log.error("Error fetching addresses for user ID: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new RestResponse<>(ApiStatusResponse.INTERNAL_SERVER_ERROR, e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<RestResponse<AddressDTO>> getAddressById(@PathVariable int id) {
        try {
            log.info("Fetching address with ID: {}", id);
            AddressDTO address = addressService.getById(id);
            if (address != null) {
                return ResponseEntity.ok(new RestResponse<>(ApiStatusResponse.SUCCESS, address));
            }
            log.warn("Address with ID {} not found", id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new RestResponse<>(ApiStatusResponse.NOT_FOUND, "Address not found"));
        } catch (Exception e) {
            log.error("Error fetching address with ID: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new RestResponse<>(ApiStatusResponse.INTERNAL_SERVER_ERROR, e.getMessage()));
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<RestResponse<String>> deleteAddress(@PathVariable int id) {
        try {
            log.info("Deleting address with ID: {}", id);
            addressService.deleteById(id);
            return ResponseEntity.ok(new RestResponse<>(ApiStatusResponse.SUCCESS, "Address deleted successfully"));
        } catch (Exception e) {
            log.error("Error deleting address with ID: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new RestResponse<>(ApiStatusResponse.INTERNAL_SERVER_ERROR, e.getMessage()));
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<RestResponse<AddressDTO>> updateAddress(@PathVariable int id, @RequestBody AddressDTO addressDTO) {
        try {
            log.info("Updating address with ID: {}", id);
            AddressDTO updatedAddress = addressService.updateAddress(id, addressDTO);
            if (updatedAddress != null) {
                return ResponseEntity.ok(new RestResponse<>(ApiStatusResponse.SUCCESS, updatedAddress));
            } else {
                log.warn("Address with ID {} not found for update", id);
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new RestResponse<>(ApiStatusResponse.NOT_FOUND, "Address not found"));
            }
        } catch (Exception e) {
            log.error("Error updating address with ID: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new RestResponse<>(ApiStatusResponse.INTERNAL_SERVER_ERROR, e.getMessage()));
        }
    }

    @PostMapping("/add")
    public ResponseEntity<RestResponse<AddressDTO>> addAddress(@RequestBody AddressDTO addressDTO) {
        try {
            log.info("Adding new address: {}", addressDTO);
            AddressDTO savedAddress = addressService.addAddress(addressDTO);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new RestResponse<>(ApiStatusResponse.CREATED, savedAddress));
        } catch (Exception e) {
            log.error("Error adding new address", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new RestResponse<>(ApiStatusResponse.INTERNAL_SERVER_ERROR, e.getMessage()));
        }
    }
}