package com.ttu.pay.controller;

import com.ttu.pay.exception.ResourceNotFoundException;
import com.ttu.pay.model.Student;
import com.ttu.pay.payload.StudentResponse;
import com.ttu.pay.repository.StudentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;

@PreAuthorize("hasRole('USER')")
@RestController
@RequestMapping("/student")
@CrossOrigin(origins = "http://localhost:3000")

public class StudentController {
    private StudentRepository studentRepository;
    private RestTemplate restTemplate;
    private static final Logger logger = LoggerFactory.getLogger(StudentController.class);

    public StudentController(StudentRepository studentRepository, RestTemplate restTemplate) {
        this.studentRepository = studentRepository;
        this.restTemplate = restTemplate;
    }


    /**
     * Get student data from local database
     *
     * @param email
     * @return Student
     */
    @GetMapping(value = "/getStudentByEmail")
    public Student getByEmail(@PathVariable("email") String email) {
        var student = this.studentRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("Student not found", "id", email));
        return student;
       /* return repository.findById(id)
                .map(address -> {
                    address.setCity(newAddress.getCity());
                    address.setPin(newAddress.getPostalCode());
                    return repository.save(address);
                })
                .orElseGet(() -> {
                    return repository.save(newAddress);
                });*/
    }

    /**
     * Get data from external service .. srms.ttuportal.com
     *
     * @param email
     * @return StudentResponse
     */
    @GetMapping(value = "/getStudentData/{email}",produces = MediaType.APPLICATION_JSON_VALUE)
    public StudentResponse getInfo(@PathVariable String email) {
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        HttpEntity <String> entity = new HttpEntity<String>(headers);

        String url = "https://srms.ttuportal.com/api/student/email/" + email;

        var student=restTemplate.exchange(url, HttpMethod.GET, entity, StudentResponse.class).getBody();
        logger.info("student data is " + student.toString());
        return student;


        /*String url = "https://jsonplaceholder.typicode.com/posts/{id}";
        ResponseEntity<Post> response = this.restTemplate.getForEntity(url, Post.class, 1);
        if(response.getStatusCode() == HttpStatus.OK) {
            return response.getBody();
        } else {
            return null;
        }*/

    }
    //http://localhost:8080/greeting?name=User
    @GetMapping("/greeting")
    public String greeting(@RequestParam(value = "name", defaultValue = "World") String name) {
       var data=studentRepository.toString();
       return data;
    }

}
