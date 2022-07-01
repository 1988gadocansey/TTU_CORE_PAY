package com.ttu.pay.payload;

import com.ttu.pay.model.Details;

public class PBLResponse {
    private String status;
    private String message;

    public PBLResponse(String status, String message, Details details, String statusMessage) {
        this.status = status;
        this.message = message;
        this.details = details;
        this.statusMessage = statusMessage;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Details getDetails() {
        return details;
    }

    public void setDetails(Details details) {
        this.details = details;
    }

    public String getStatusMessage() {
        return statusMessage;
    }

    public void setStatusMessage(String statusMessage) {
        this.statusMessage = statusMessage;
    }

    private Details details;
    public String statusMessage;
}
