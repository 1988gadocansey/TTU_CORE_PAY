package com.ttu.pay.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
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
    @JsonProperty("code")
    private String code;
    @NotNull
    @JsonProperty("name")
    private String name;
    @NotNull
    @JsonProperty("part")
    private boolean acceptPartPayment=true;
    @NotNull
    private String purpose;
    @NotNull
    private BigDecimal amount;
    @NotNull
    private String currency;
    @NotNull
    private LocalDate startDate;
    @NotNull
    private  LocalDate endDate;
    @NotNull
    private  String bank;
    @NotNull
    private  String instructions;
    private boolean status;
    private String  url;
    @OneToMany(mappedBy="products")
    private Set<Payment> payments;

}
