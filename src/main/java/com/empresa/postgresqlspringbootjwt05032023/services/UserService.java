package com.empresa.postgresqlspringbootjwt05032023.services;

import java.util.List;

import com.empresa.postgresqlspringbootjwt05032023.repositories.UserRepository;
import com.empresa.postgresqlspringbootjwt05032023.models.User;
import com.empresa.postgresqlspringbootjwt05032023.models.UserEntity;

public class UserService {

    UserRepository userRepository = new UserRepository();

    public List<User> index() {
        return userRepository.findAll();
    }

    public UserEntity show(int id) {
        return userRepository.findUserById(id);
    }

    public int store(User user) {
        return userRepository.save(user);
    }
}