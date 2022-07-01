package com.ttu.pay.controller;

import com.ttu.pay.exception.ResourceNotFoundException;
import com.ttu.pay.model.Product;
import com.ttu.pay.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("products")
@PreAuthorize("hasRole('USER')")
public class ProductController {
    ProductRepository productRepository;

    @Autowired
    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }
    @GetMapping(value = "/index")
    public List<Product> getAllProducts() {
        return productRepository.findAll()
                .stream()
                //  .map(e->e.getName()) // if we want only names from the product object
                .filter(product -> Objects.equals(product.getStartDate(), LocalDate.now()))
                .filter(product -> product.isStatus())
                .sorted(Comparator.comparing(Product::getName))
                .distinct() // remove duplicates
                .limit(10)   // take only 10
                .collect(Collectors.toList());
    }
    @GetMapping(value = "/{id}")
    public Product getProductById(@PathVariable("id") UUID id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "id", id));
        return product;
    }
   /* @RequestMapping(value = "/users", method = RequestMethod.GET)
    public ResponseEntity<User> getUserByUsername (@RequestBody String username){
        final User user = userService.getUserByUsername(username);
        return ResponseEntity.ok(user);
    }*/
}
