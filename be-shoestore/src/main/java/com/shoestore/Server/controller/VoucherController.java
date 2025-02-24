package com.shoestore.Server.controller;

import com.shoestore.Server.dto.request.VoucherDTO;
import com.shoestore.Server.dto.response.ApiStatusResponse;
import com.shoestore.Server.dto.response.RestResponse;
import com.shoestore.Server.service.VoucherService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/voucher")
public class VoucherController {

    private final VoucherService voucherService;

    public VoucherController(VoucherService voucherService) {
        this.voucherService = voucherService;
    }

    @GetMapping("/eligible")
    public ResponseEntity<RestResponse<List<VoucherDTO>>> getEligibleVouchers(@RequestParam BigDecimal orderValue) {
        try {
            log.info("Fetching eligible vouchers for order value: {}", orderValue);
            List<VoucherDTO> vouchers = voucherService.getEligibleVouchers(orderValue);
            return ResponseEntity.ok(new RestResponse<>(ApiStatusResponse.SUCCESS, vouchers));
        } catch (Exception e) {
            log.error("Failed to fetch eligible vouchers", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new RestResponse<>(ApiStatusResponse.INTERNAL_SERVER_ERROR, e.getMessage()));
        }
    }

    @GetMapping("/by-voucher-id/{id}")
    public ResponseEntity<RestResponse<VoucherDTO>> getVoucherById(@PathVariable int id) {
        try {
            log.info("Fetching voucher by ID: {}", id);
            VoucherDTO voucher = voucherService.getVoucherById(id);
            if (voucher == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new RestResponse<>(ApiStatusResponse.NOT_FOUND, "Voucher not found"));
            }
            return ResponseEntity.ok(new RestResponse<>(ApiStatusResponse.SUCCESS, voucher));
        } catch (Exception e) {
            log.error("Failed to fetch voucher by ID: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new RestResponse<>(ApiStatusResponse.INTERNAL_SERVER_ERROR, e.getMessage()));
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<RestResponse<String>> deleteVoucher(@PathVariable int id) {
        try {
            log.info("Deleting voucher with ID: {}", id);
            voucherService.deleteVoucher(id);
            return ResponseEntity.ok(new RestResponse<>(ApiStatusResponse.SUCCESS, "Voucher deleted successfully"));
        } catch (Exception e) {
            log.error("Failed to delete voucher with ID: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new RestResponse<>(ApiStatusResponse.INTERNAL_SERVER_ERROR, e.getMessage()));
        }
    }
}
