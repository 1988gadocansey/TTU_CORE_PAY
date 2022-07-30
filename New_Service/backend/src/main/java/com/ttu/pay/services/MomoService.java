package com.ttu.pay.services;

import com.ttu.pay.controller.StudentController;
import com.ttu.pay.model.Product;
import com.ttu.pay.payload.PBLResponse;
import com.ttu.pay.payload.StudentResponse;
import com.ttu.pay.repository.ProductRepository;
import net.minidev.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Base64;
import java.util.Optional;
import java.util.UUID;

public class MomoService implements Momo {
    private static String url = "https://digihub.prudentialbank.com.gh/MobileMoneyPayment/api/Transaction";
    private final String clientAuth = "AD411E74-28C2-4BF9-8F9D-D5B7E22F9226";
    private final String password = "Temp123$";
    private final String username = "momoapi.user.ttu";
    private static String srmsUrl = "https://srms.ttuportal.com/api/receivePayment";
    private final String srmsAuth = "128ashbx393932";
    private ProductRepository productRepository;
    private RestTemplate restTemplate;
    private static final Logger logger = LoggerFactory.getLogger(MomoService.class);

    public MomoService(ProductRepository productRepository, RestTemplate restTemplate) {
        this.productRepository = productRepository;
        this.restTemplate = restTemplate;
    }

    @Override
    public void Authenticate() {
        System.out.println("authenticate users");
    }

    @Override
    public int DebitWallet(String walletType, String senderName, String senderNumber, BigDecimal amount, String transactionId, String remarks) {

        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        headers.setBasicAuth(username, password);
        var debitUrl = url + "/DebitWallet";
        var requestObject = new JSONObject();
        requestObject.put("clientId", clientAuth);
        requestObject.put("walletType", walletType);
        requestObject.put("senderName", senderNumber);
        requestObject.put("amount", amount);
        requestObject.put("transactionId", transactionId);
        requestObject.put("transactionDate", LocalDateTime.now());
        requestObject.put("remarks", remarks);
        HttpEntity<JSONObject> object = new HttpEntity<>(requestObject, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(debitUrl, object, String.class);

        return response.getStatusCodeValue();

    }

    @Override
    public int CreditWallet(String walletType, String recipientName, String recipientNumber, BigDecimal amount, String transactionId, String remarks) {
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        headers.setBasicAuth(username, password);
        var debitUrl = url + "/CreditWallet";
        var requestObject = new JSONObject();
        requestObject.put("clientId", clientAuth);
        requestObject.put("walletType", walletType);
        requestObject.put("recipientName", recipientName);
        requestObject.put("senderNumber", recipientNumber);
        requestObject.put("amount", amount);
        requestObject.put("transactionId", transactionId);
        requestObject.put("remarks", remarks);
        HttpEntity<JSONObject> object = new HttpEntity<>(requestObject, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(debitUrl, object, String.class);

        return response.getStatusCodeValue();

    }

    @Override
    public ResponseEntity<PBLResponse> GetTransactionStatus(String walletType, String transactionId) {
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        headers.setBasicAuth(username, password);
        var debitUrl = url + "/GetTransactionStatus";
        var requestObject = new JSONObject();
        requestObject.put("clientId", clientAuth);
        requestObject.put("walletType", walletType);
        requestObject.put("transactionId", transactionId);
        HttpEntity<JSONObject> object = new HttpEntity<>(requestObject, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(debitUrl, object, String.class);


        return new ResponseEntity<>(PBLResponse, response.toString());
    }

    @Override
    public String FindProduct(UUID productId) {
        var product = productRepository.findById(productId).stream().filter(Product::isStatus)
                .findFirst().get();
        return product.getName();

    }

    @Override
    public String VodaAirtel(String phone) {
        return null;
    }

    @Override
    public int SendPaymentToSRMS(String indexNo, BigDecimal amount, String accountNumber, String feeType, String transactionId, LocalDateTime transactionDate) {
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        //headers.setBasicAuth(username, password);
        var debitUrl = srmsUrl;
        var requestObject = new JSONObject();
        requestObject.put("indexno", indexNo);
        requestObject.put("amount", amount);
        requestObject.put("accountNumber", accountNumber);
        requestObject.put("fee_type", feeType);
        requestObject.put("transactionId", transactionId);
        requestObject.put("auth", srmsAuth);
        HttpEntity<JSONObject> object = new HttpEntity<>(requestObject, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(debitUrl, object, String.class);
        return response.getStatusCodeValue();
    }
}
