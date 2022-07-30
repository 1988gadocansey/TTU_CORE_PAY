package com.ttu.pay.payload;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class StudentResponse {
    private String INDEXNO;
    private String STNO;
    private String NAME,PROGRAMMECODE,LEVEL,STATUS,TELEPHONENO,EMAIL;
    private float CGPA,BILLS,PAID;

    @Override
    public String toString() {
        return "StudentResponse{" +
                "INDEXNO='" + INDEXNO + '\'' +
                ", STNO='" + STNO + '\'' +
                ", NAME='" + NAME + '\'' +
                ", PROGRAMMECODE='" + PROGRAMMECODE + '\'' +
                ", LEVEL='" + LEVEL + '\'' +
                ", STATUS='" + STATUS + '\'' +
                ", TELEPHONENO='" + TELEPHONENO + '\'' +
                ", EMAIL='" + EMAIL + '\'' +
                ", CGPA=" + CGPA +
                ", BILLS=" + BILLS +
                ", PAID=" + PAID +
                '}';
    }
    public StudentResponse(){

    }
    /*public StudentResponse(String INDEXNO, String STNO, String NAME, String PROGRAMMECODE, String LEVEL, String STATUS, String TELEPHONENO, String EMAIL, float CGPA, float BILLS, float PAID) {
        this.INDEXNO = INDEXNO;
        this.STNO = STNO;
        this.NAME = NAME;
        this.PROGRAMMECODE = PROGRAMMECODE;
        this.LEVEL = LEVEL;
        this.STATUS = STATUS;
        this.TELEPHONENO = TELEPHONENO;
        this.EMAIL = EMAIL;
        this.CGPA = CGPA;
        this.BILLS = BILLS;
        this.PAID = PAID;
    }*/

    public String getINDEXNO() {
        return INDEXNO;
    }
    @JsonProperty("INDEXNO")
    public void setINDEXNO(String INDEXNO) {
        this.INDEXNO = INDEXNO;
    }

    public String getSTNO() {
        return STNO;
    }
    @JsonProperty("STNO")
    public void setSTNO(String STNO) {
        this.STNO = STNO;
    }

    public String getNAME() {
        return NAME;
    }
    @JsonProperty("NAME")
    public void setNAME(String NAME) {
        this.NAME = NAME;
    }

    public String getPROGRAMMECODE() {
        return PROGRAMMECODE;
    }
    @JsonProperty("PROGRAMMECODE")
    public void setPROGRAMMECODE(String PROGRAMMECODE) {
        this.PROGRAMMECODE = PROGRAMMECODE;
    }

    public String getLEVEL() {
        return LEVEL;
    }
    @JsonProperty("LEVEL")
    public void setLEVEL(String LEVEL) {
        this.LEVEL = LEVEL;
    }

    public String getSTATUS() {
        return STATUS;
    }
    @JsonProperty("STATUS")
    public void setSTATUS(String STATUS) {
        this.STATUS = STATUS;
    }

    public String getTELEPHONENO() {
        return TELEPHONENO;
    }
    @JsonProperty("TELEPHONENO")
    public void setTELEPHONENO(String TELEPHONENO) {
        this.TELEPHONENO = TELEPHONENO;
    }

    public String getEMAIL() {
        return EMAIL;
    }
    @JsonProperty("EMAIL")
    public void setEMAIL(String EMAIL) {
        this.EMAIL = EMAIL;
    }

    public float getCGPA() {
        return CGPA;
    }
    @JsonProperty("CGPA")
    public void setCGPA(float CGPA) {
        this.CGPA = CGPA;
    }

    public float getBILLS() {
        return BILLS;
    }
    @JsonProperty("BILLS")
    public void setBILLS(float BILLS) {
        this.BILLS = BILLS;
    }

    public float getPAID() {
        return PAID;
    }
    @JsonProperty("PAID")
    public void setPAID(float PAID) {
        this.PAID = PAID;
    }
}
