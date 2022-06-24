package com.ttu.pay.repository;

import com.ttu.pay.model.Payment;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface PaymentRepository extends CrudRepository<Payment, UUID> {
}
