package com.empresa.postgresqlspringbootjwt05032023.services;

import java.util.List;

import com.empresa.postgresqlspringbootjwt05032023.repositories.UserRepository;
import com.empresa.postgresqlspringbootjwt05032023.models.User;

public class UserService {

    UserRepository userRepository = new UserRepository();

    public List<User> index() {
        return userRepository.findAll();
    }

    public void store(User user) {
        userRepository.save(user);
    }
}