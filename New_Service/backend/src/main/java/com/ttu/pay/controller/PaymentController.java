package com.ttu.pay.controller;

import com.ttu.pay.model.Payment;
import com.ttu.pay.repository.PaymentRepository;
import com.ttu.pay.repository.ProductRepository;
import com.ttu.pay.repository.StudentRepository;
import com.ttu.pay.services.MomoService;
import net.minidev.json.JSONObject;
import netscape.javascript.JSObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.validation.Valid;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@PreAuthorize("hasRole('USER')")
@RestController
@RequestMapping("/payments")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {
    final static String accountNumber = "0271900010010";
    private PaymentRepository paymentRepository;
    private ProductRepository productRepository;
    private StudentRepository studentRepository;
    private MomoService momoService;
    private RestTemplate restTemplate;
    private static final Logger logger = LoggerFactory.getLogger(PaymentController.class);

    public PaymentController(PaymentRepository paymentRepository, ProductRepository productRepository, StudentRepository studentRepository, MomoService momoService, RestTemplate restTemplate) {
        this.paymentRepository = paymentRepository;
        this.productRepository = productRepository;
        this.studentRepository = studentRepository;
        this.momoService = momoService;
        this.restTemplate = restTemplate;
    }

    @PostMapping(value = "/save", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Payment> save(@Valid @RequestBody Payment payment) {

        var product = productRepository.findById(payment.getProduct().getId()).get();
        var transactionId = UUID.randomUUID();
        // let's call the momo service for debit from student wallet
        var momoRequest = momoService.DebitWallet(
                payment.getWalletType().toString(),
                payment.getName(),
                payment.getPhone(),
                payment.getAmount(),
                transactionId.toString(),
                product.getName()
        );
        if (momoRequest == 200) {
            // if momo request to the prudential server is ok() i.e. 200 then lets get trans status
            var transactionStatus = momoService.GetTransactionStatus(payment.getWalletType().toString(), transactionId.toString());
            //JSONSerializer serializer = new JSONSerializer().prettyPrint(true); // pretty print JSON
            JSONSuccessResponse responseBody = body.as(JSONSuccessResponse.class);

            paymentRepository.save(payment);
            switch (transactionStatus) {
                case "0":
                    // send data to srms
                    if (momoService.SendPaymentToSRMS(payment.getIndexno(), payment.getAmount(), accountNumber, payment.getProduct().getName(), transactionId.toString(), payment.getTransactionDate()) == 0) {
                        return new ResponseEntity<>(payment, HttpStatus.OK);
                    } else {
                        logger.info("Error reaching TTU Fee payment server.");
                        return new ResponseEntity<>(payment, HttpStatus.BAD_GATEWAY);
                    }
                    break;
                case "1":
                    logger.info("Payment transaction processing failed.");
                    return new ResponseEntity<>(payment, HttpStatus.BAD_REQUEST);

            }

        } else {
            logger.error("Unable to reach PBL Service. Contact Prudential Bank.");
            return new ResponseEntity<>(payment, HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(payment, HttpStatus.OK);
    }

    /*
        all payments for student order by transaction date desc
        @return Payment object
     */
    @GetMapping(value = "/{indexno}")
    public List<Payment> findAllByIndexno(@PathVariable("indexno") String indexno) {
        return paymentRepository.findAllByIndexno(indexno)
                .stream()
                .filter(payment -> payment.getIndexno().equals(indexno))
                .sorted(Comparator.comparing(Payment::getTransactionDate, Comparator.nullsLast(Comparator.reverseOrder())))
                .limit(10)   // last 10 transactions
                .collect(Collectors.toList());
    }

}

