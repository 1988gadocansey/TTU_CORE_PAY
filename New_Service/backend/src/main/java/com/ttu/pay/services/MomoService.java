package com.ttu.pay.services;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

public class MomoService implements Momo {
    private static String url = "https://digihub.prudentialbank.com.gh/MobileMoneyPayment/api/Transaction";
    private final String clientAuth = "AD411E74-28C2-4BF9-8F9D-D5B7E22F9226";
    private final String password = "Temp123$";
    private final String username = "momoapi.user.ttu";
    private static String srmsUrl = "https://srms.ttuportal.com/api/receivePayment";
    private final String srmsAuth = "128ashbx393932";


    @Override
    public void Authenticate() {

    }

    @Override
    public int DebitWallet(String walletType, String senderName, String senderNumber, BigDecimal amount, String transactionId, String remarks) {
        return 0;
    }

    @Override
    public String CreditWallet(String walletType, String receipientName, String receipientNumber, BigDecimal amount, String transactionId, String remarks) {
        return null;
    }

    @Override
    public String GetTransactionStatus(String walletType, String transactionId) {
        return null;
    }

    @Override
    public String Find(UUID productId) {
        return null;
    }

    @Override
    public String VodaAirtel(String phone) {
        return null;
    }

    @Override
    public String SendPaymentToSRMS(String indexNo, BigDecimal amount, String accountNumber, String feeType, String transactionId, LocalDateTime transactionDate) {
        return null;
    }
}
