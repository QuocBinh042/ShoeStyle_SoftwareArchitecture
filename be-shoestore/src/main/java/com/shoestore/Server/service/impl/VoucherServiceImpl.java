package com.shoestore.Server.service.impl;

import com.shoestore.Server.entities.Voucher;
import com.shoestore.Server.repositories.VoucherRepository;
import com.shoestore.Server.service.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class VoucherServiceImpl implements VoucherService {

    private final VoucherRepository voucherRepository;

    public VoucherServiceImpl(VoucherRepository voucherRepository) {
        this.voucherRepository = voucherRepository;
    }


    @Override
    public List<Voucher> getAllVouchers() {
        return voucherRepository.findAll();
    }

    @Override
    public void deleteVoucher(int voucherID) {
        voucherRepository.deleteById(voucherID);
    }

    public List<Voucher> searchVouchers(LocalDate startDate, LocalDate endDate) {
        return voucherRepository.findVouchersByDateRange(startDate, endDate);
    }

    public List<Voucher> getEligibleVouchers(BigDecimal orderValue) {
        return voucherRepository.findByMinOrderValueLessThanEqualAndStatusTrueAndStartDateBeforeAndEndDateAfter(
                orderValue, LocalDateTime.now(), LocalDateTime.now());
    }


}
