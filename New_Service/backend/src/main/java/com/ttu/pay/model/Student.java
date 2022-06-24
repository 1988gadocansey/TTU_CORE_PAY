package com.ttu.pay.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.UUID;
@Getter
@Setter
@Accessors(chain=true)
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Student{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private UUID id;
    @NotNull
    public String studentId;
    @NotNull
    public String stno;
    @NotNull
    public String indexNo;
    @NotNull
    public String name ;

    @NotNull
    public String programme;
    @NotNull
    public String level;
    @NotNull
    public String phone;
    @NotNull
    public String email ;
    @OneToOne
    @JoinColumn(name = "user_id")
    @NotNull
    public User user;
    private LocalDateTime CreatedOn;
    private LocalDateTime UpdatedOn;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
