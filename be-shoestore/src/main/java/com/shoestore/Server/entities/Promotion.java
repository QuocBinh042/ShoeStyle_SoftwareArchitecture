package com.shoestore.Server.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "Promotion")
public class Promotion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int promotionID;
    @Column(name = "name", nullable = false, columnDefinition = "NVARCHAR(50)")
    private String name;
    @Column(name = "description", nullable = false, columnDefinition = "NVARCHAR(255)")
    private String description;
    private String discountType;
    private BigDecimal discountValue;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private boolean status;

}

