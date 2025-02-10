package com.shoestore.Server.service;

import com.shoestore.Server.entities.Voucher;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface VoucherService{
    Voucher getVoucherById(int id);
    public void deleteVoucher(int voucherID);
    public List<Voucher> getAllVouchers();
    public List<Voucher> searchVouchers(LocalDate startDate, LocalDate endDate);
    public List<Voucher> getEligibleVouchers(BigDecimal orderValue);
}
