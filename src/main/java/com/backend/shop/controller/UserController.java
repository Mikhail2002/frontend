package com.backend.shop.controller;

import com.backend.shop.model.User;
import com.backend.shop.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/get")
    public List<User> getUsers() {
        return userService.getAll();
    }

    @GetMapping("/get/{email}")
    public List<User> getUserByEmail(@PathVariable("email") String email) {
        return userService.getByEmail(email);
    }

    @PostMapping("/add")
    public void createUser(@RequestBody User user, Model model) {
        userService.save(user);
    }

    @DeleteMapping(path = { "/{id}" })
    public void deleteUser(@PathVariable("id") long id) {
        userService.deleteById(id);
    }

}
