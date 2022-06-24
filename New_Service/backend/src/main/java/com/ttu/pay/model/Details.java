package com.ttu.pay.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class Details {
  /*  private String status;
    private String receiverTransId;
    private String receiverAccountName;
    private String receiverAccountNumber;
    private String senderName;
    private String senderNumber;
    private String senderTransId;*/
    private String cb_msg;
    private LocalDateTime cb_date;
    private  String cb_code;
    private String cb_system_msg;
    private String cb_AuthorRefID;
    private BigDecimal cb_balBefore;
    private String cb_system_code;
    private  String cb_type;
    private  String cb_userID;
    private  String cb_transactionID;
    private  String cb_network;
    private  String cb_reference;
    private  BigDecimal cb_balAfter;
    private  String cb_metadataID;
    private  String cb_refID;

}
