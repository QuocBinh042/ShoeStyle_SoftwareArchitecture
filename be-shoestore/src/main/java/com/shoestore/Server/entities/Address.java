package com.shoestore.Server.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "Address")
@ToString
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "addressID")
    private int addressID;

    @Column(name = "street", nullable = false, columnDefinition = "NVARCHAR(50)")
    private String street;

    @Column(name = "city", nullable = false, columnDefinition = "NVARCHAR(20)")
    private String city;

    @Column(name = "ward", nullable = false, columnDefinition = "NVARCHAR(20)")
    private String ward;

    @Column(name = "district", nullable = false, columnDefinition = "NVARCHAR(20)")
    private String district;

    @Column(name = "fullName", nullable = false, columnDefinition = "NVARCHAR(20)")
    private String fullName;

    @Column(name = "phone", nullable = false, columnDefinition = "NVARCHAR(10)")
    private String phone;

    @Column(columnDefinition = "NVARCHAR(20)")
    private String type;

    @Column(name = "isDefault", nullable = false)
    private boolean isDefault;

    @ManyToOne
    @JoinColumn(name = "userID")
    @JsonBackReference
    private User user;

    @CreationTimestamp
    @Column(name = "createdAt", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updatedAt")
    private LocalDateTime updatedAt;
}