package com.empresa.postgresqlspringbootjwt05032023.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.List;
import com.empresa.postgresqlspringbootjwt05032023.services.UserService;
import com.empresa.postgresqlspringbootjwt05032023.models.User;

@CrossOrigin
@RestController
@RequestMapping("/users")
public class UserController {

    UserService userService = new UserService();

    @GetMapping
    public List<User> index() {
        List<User> users = userService.index();
        return users;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> show(@PathVariable int id) {
        User user = userService.show(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping
    public void store(@RequestBody User user) {
        userService.store(user);
    }
}