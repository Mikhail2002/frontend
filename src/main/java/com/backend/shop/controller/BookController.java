package com.backend.shop.controller;

import com.backend.shop.model.Book;
import com.backend.shop.service.ProductService;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "books")
@RequiredArgsConstructor
public class BookController {

    private byte[] bytes;

    private final ProductService productService;

    @GetMapping("/get")
    public List<Book> getBooks() {
        return productService.getAll();
    }

    @PostMapping("/upload")
    public void uploadImage(@RequestParam("imageFile") MultipartFile file) throws IOException {
        this.bytes = file.getBytes();
    }

    @PostMapping("/add")
    public void createBook(@RequestBody Book book) throws IOException {
        book.setPicByte(this.bytes);
        productService.save(book);
        this.bytes = null;
    }

    @DeleteMapping(path = { "/{id}" })
    public void deleteBook(@PathVariable("id") long id) {
        productService.deleteById(id);
    }

    @PutMapping("/update")
    public void updateBook(@RequestBody Book book) {
        productService.save(book);
    }
}
