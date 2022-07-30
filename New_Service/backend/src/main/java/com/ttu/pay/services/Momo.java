package com.ttu.pay.services;

import com.ttu.pay.model.Payment;
import com.ttu.pay.model.Product;
import com.ttu.pay.payload.PBLResponse;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

public interface Momo {
    public void Authenticate();
    public int DebitWallet(String walletType, String senderName, String senderNumber, BigDecimal amount,
                           String transactionId, String remarks);
    public int CreditWallet(String walletType, String recipientName, String recipientNumber,
                               BigDecimal amount, String transactionId, String remarks);
    public ResponseEntity<PBLResponse> GetTransactionStatus(String walletType, String transactionId);
    public String FindProduct(UUID productId);
    public String VodaAirtel(String phone);
    public int SendPaymentToSRMS(String indexNo, BigDecimal amount, String accountNumber, String feeType, String transactionId, LocalDateTime transactionDate);

}
