package com.ttu.pay.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;
import javax.validation.constraints.Email;
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
@Table(name = "payments", uniqueConstraints = {
        @UniqueConstraint(columnNames = "TransactionId")
})
public class Payment implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private UUID id;

    @NotNull
    private String indexno;
    @NotNull
    private String name;
    @Email
    @NotNull
    private String email;
    @NotNull
    private String level;
    @NotNull
    private BigDecimal amount;
    @NotNull
    private String bank;
    @NotNull
    private String academicYear;
    @NotNull
    private String paymentRemarks;
    @NotNull
    // actual phone no used for the payment
    private String phone;
    @NotNull
    private boolean status;
    @NotNull
    @Column(unique = true)
    private String transactionId;
    @NotNull
    private Providers walletType = Providers.MTN;
    // actual date the client initiated the transaction
    @NotNull
    private LocalDateTime transactionDate;
    @NotNull
    // date the bank push transaction to us
    private LocalDateTime bankDate;
    private LocalDateTime CreatedOn;
    private LocalDateTime UpdatedOn;
    @ManyToOne
    @JoinColumn(name = "user_id")
    @NotNull
    public User user;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }
}
