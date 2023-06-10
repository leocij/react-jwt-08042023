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
import com.empresa.postgresqlspringbootjwt05032023.models.UserEntity;
import com.empresa.postgresqlspringbootjwt05032023.models.Credential;
import com.empresa.postgresqlspringbootjwt05032023.services.CredentialService;

@CrossOrigin
@RestController
@RequestMapping("/users")
public class UserController {

    private CredentialService credentialService;

    public UserController(CredentialService credentialService) {
        this.credentialService = credentialService;
    }

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
    public void store(@RequestBody UserEntity userEntity) {

        // System.out.println(userEntity.getName());
        // List<Credential> credentials = userEntity.getCredentials();
        // for(Credential credential: credentials) {
        //     System.out.println(credential.getEmail());
        //     System.out.println(credential.getPassword());
        // }

        User user = new User();
        user.setName(userEntity.getName());

        int userIdReturned = userService.store(user);

        // System.out.println(userIdReturned);

        List<Credential> credentials = userEntity.getCredentials();

        for(Credential credential: credentials) {
            credential.setUserId(userIdReturned);
            credentialService.store(credential);
        }
    }
}