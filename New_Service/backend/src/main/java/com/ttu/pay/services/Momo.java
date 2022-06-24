package com.ttu.pay.services;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

public interface Momo {
    public void Authenticate();
    public int DebitWallet(String walletType, String senderName, String senderNumber, BigDecimal amount,
                           String transactionId, String remarks);
    public String CreditWallet(String walletType, String receipientName, String receipientNumber,
                               BigDecimal amount, String transactionId, String remarks);
    public String GetTransactionStatus(String walletType, String transactionId);
    public String Find(UUID productId);
    public String VodaAirtel(String phone);
    public String SendPaymentToSRMS(String indexNo, BigDecimal amount, String accountNumber, String feeType, String transactionId, LocalDateTime transactionDate);

}
