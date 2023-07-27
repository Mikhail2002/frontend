package com.backend.shop.service;

import com.backend.shop.model.User;
import com.backend.shop.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;


    public List<User> getAll (){
        return userRepository.findAll().stream().toList();
    }

    public List<User> getById (Long id){
        return userRepository.findById(id).stream().toList();
    }

    public List<User> getByEmail (String email){
        return userRepository.findByEmail(email).stream().toList();
    }

    public void save(User user){
        userRepository.save(user);
    }

    public void deleteById (Long id){
        userRepository.deleteById(id);
    }
}
