package com.ttu.pay.payload;

public class SMSResponse {
   private String responseCode;
    private String responseMessage;
    public SMSResponse(String responseCode, String responseMessage) {
        this.responseCode = responseCode;
        this.responseMessage = responseMessage;
    }


}
