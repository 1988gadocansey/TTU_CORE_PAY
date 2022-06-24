package com.ttu.pay.repository;

import com.ttu.pay.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);
  /*  @Query("select u from User u where u.email = :email")
    List<User> findByFirstname(String email);*/
}
