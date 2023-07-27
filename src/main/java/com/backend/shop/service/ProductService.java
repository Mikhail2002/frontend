package com.backend.shop.service;

import com.backend.shop.model.Book;
import com.backend.shop.repositories.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final BookRepository bookRepository;

    public List<Book> getAll (){
        return bookRepository.findAll();
    }

    public List<Book> getById (Long id){
        return bookRepository.findById(id).stream().toList();
    }

    public void save(Book book){
        bookRepository.save(book);
    }

    public void deleteById (Long id){
        bookRepository.deleteById(id);
    }
}
