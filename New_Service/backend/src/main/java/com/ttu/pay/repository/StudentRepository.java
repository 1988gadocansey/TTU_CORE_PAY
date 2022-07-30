package com.ttu.pay.repository;

import com.ttu.pay.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;
import java.util.UUID;

public interface StudentRepository extends CrudRepository<Student, UUID> {
    Optional<Student> findByEmail(String email);
}
