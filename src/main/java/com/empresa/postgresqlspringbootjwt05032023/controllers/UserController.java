package com.empresa.postgresqlspringbootjwt05032023.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;

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

        // for (int i = 0; i < users.size(); i++) {
        //     System.out.println("Id: " + users.get(i).getId());
        //     System.out.println("Name: " + users.get(i).getName());
        //     System.out.println("CreatedAt: " + users.get(i).getCreatedAt());
        //     System.out.println("UpdatedAt: " + users.get(i).getUpdatedAt());
        //     System.out.println();
        // }

        // return "Hello World";
        return users;
    }

    @PostMapping
    public void store(@RequestBody User user) {
        // System.out.println(user.getName());

        userService.store(user);
    }
}