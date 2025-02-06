package com.shoestore.Server.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "Voucher")
public class Voucher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int voucherID;
    @Column(name = "code", unique = true, nullable = false, columnDefinition = "NVARCHAR(50)")
    private String code;
    @Column(name = "description", nullable = false, columnDefinition = "NVARCHAR(255)")
    private String description;

    private BigDecimal discountValue;

    private String discountType;

    private BigDecimal minOrderValue;

    private boolean freeShipping;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private boolean status;
}
