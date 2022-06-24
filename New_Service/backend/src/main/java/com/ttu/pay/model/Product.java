package com.ttu.pay.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;
@Getter
@Setter
@Accessors(chain=true)
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Product implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private UUID id;
    @NotNull
    private String code;
    @NotNull
    private String name;
    @NotNull
    private boolean acceptPartPayment=true;
    @NotNull
    private String purpose;
    @NotNull
    private BigDecimal amount;
    @NotNull
    private String currency;
    @NotNull
    private LocalDateTime startDate;
    @NotNull
    private  LocalDateTime endDate;
    @NotNull
    private  String bank;
    @NotNull
    private  String instructions;
    private boolean status;
    private String  url;
}
