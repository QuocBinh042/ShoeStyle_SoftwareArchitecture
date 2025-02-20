package com.shoestore.Server.service.impl;

import com.shoestore.Server.dto.request.VoucherDTO;
import com.shoestore.Server.entities.Voucher;
import com.shoestore.Server.mapper.VoucherMapper;
import com.shoestore.Server.repositories.VoucherRepository;
import com.shoestore.Server.service.VoucherService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class VoucherServiceImpl implements VoucherService {

    private final VoucherRepository voucherRepository;
    private final VoucherMapper voucherMapper;

    public VoucherServiceImpl(VoucherRepository voucherRepository, VoucherMapper voucherMapper) {
        this.voucherRepository = voucherRepository;
        this.voucherMapper = voucherMapper;
    }

    @Override
    public List<VoucherDTO> getAllVouchers() {
        return voucherRepository.findAll().stream()
                .map(voucherMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public VoucherDTO getVoucherById(int id) {
        Voucher voucher = voucherRepository.findById(id).orElse(null);
        return voucher != null ? voucherMapper.toDto(voucher) : null;
    }

    @Override
    public void deleteVoucher(int voucherID) {
        voucherRepository.deleteById(voucherID);
    }

    @Override
    public List<VoucherDTO> getEligibleVouchers(BigDecimal orderValue) {
        return voucherRepository.findByMinOrderValueLessThanEqualAndStatusTrueAndStartDateBeforeAndEndDateAfter(
                        orderValue, LocalDateTime.now(), LocalDateTime.now()).stream()
                .map(voucherMapper::toDto)
                .collect(Collectors.toList());
    }
}
