package com.ttu.pay.model;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;
import java.util.UUID;


public class BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

    private UUID Id;
    private LocalDateTime CreatedOn;
    private LocalDateTime UpdatedOn;
}
