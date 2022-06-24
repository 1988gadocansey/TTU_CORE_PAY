package com.ttu.pay.controller;

import com.ttu.pay.exception.ResourceNotFoundException;
import com.ttu.pay.model.Product;
import com.ttu.pay.repository.ProductRepository;
import com.ttu.pay.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.security.PermitAll;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/products")
public class ProductController {
    ProductRepository productRepository;
    @Autowired
    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping(value="/index")
    public List<Product> getAllProducts(){
        return productRepository.findAll();
    }
    @GetMapping(value="/{id}")
    public Product getProductById(@PathVariable("id") UUID id) {
        Product product = productRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Product", "id",id));
        return product;
    }
}
