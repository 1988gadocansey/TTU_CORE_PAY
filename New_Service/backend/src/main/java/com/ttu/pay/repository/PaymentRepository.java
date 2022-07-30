package com.ttu.pay.repository;

import com.ttu.pay.model.Payment;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;
import java.util.UUID;

public interface PaymentRepository extends PagingAndSortingRepository<Payment, UUID> {
    List<Payment> findAllByIndexno(String indexno);
}
