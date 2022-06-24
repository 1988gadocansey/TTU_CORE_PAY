package com.ttu.pay.responses;

public class SMSResponse {
   private String responseCode;
    private String responseMessage;
    public SMSResponse(String responseCode, String responseMessage) {
        this.responseCode = responseCode;
        this.responseMessage = responseMessage;
    }


}
