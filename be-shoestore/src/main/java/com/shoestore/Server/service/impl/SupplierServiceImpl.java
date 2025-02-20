package com.shoestore.Server.service.impl;

import com.shoestore.Server.dto.request.SupplierDTO;
import com.shoestore.Server.entities.Supplier;
import com.shoestore.Server.mapper.SupplierMapper;
import com.shoestore.Server.repositories.SupplierRepository;
import com.shoestore.Server.service.SupplierService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SupplierServiceImpl implements SupplierService {

    private final SupplierRepository supplierRepository;
    private final SupplierMapper supplierMapper;

    public SupplierServiceImpl(SupplierRepository supplierRepository, SupplierMapper supplierMapper) {
        this.supplierRepository = supplierRepository;
        this.supplierMapper = supplierMapper;
    }

    @Override
    public SupplierDTO getSupplier(int id) {
        Supplier supplier = supplierRepository.findBySupplierID(id);
        return supplier != null ? supplierMapper.toDto(supplier) : null;
    }

    @Override
    public List<SupplierDTO> getAllSupplier() {
        return supplierRepository.findAll().stream()
                .map(supplierMapper::toDto)
                .collect(Collectors.toList());
    }
}
