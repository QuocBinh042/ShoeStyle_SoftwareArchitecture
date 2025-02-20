package com.shoestore.Server.controller;

import com.shoestore.Server.dto.request.VoucherDTO;
import com.shoestore.Server.service.VoucherService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/voucher")
public class VoucherController {

    private final VoucherService voucherService;

    public VoucherController(VoucherService voucherService) {
        this.voucherService = voucherService;
    }

    @GetMapping("/eligible")
    public ResponseEntity<List<VoucherDTO>> getEligibleVouchers(@RequestParam BigDecimal orderValue) {
        List<VoucherDTO> vouchers = voucherService.getEligibleVouchers(orderValue);
        return ResponseEntity.ok(vouchers);
    }

    @GetMapping("/by-voucher-id/{id}")
    public ResponseEntity<VoucherDTO> getVoucherById(@PathVariable int id) {
        VoucherDTO voucher = voucherService.getVoucherById(id);
        if (voucher != null) {
            return ResponseEntity.ok(voucher);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteVoucher(@PathVariable int id) {
        voucherService.deleteVoucher(id);
        return ResponseEntity.ok("Voucher deleted");
    }
}
