package com.empresa.postgresqlspringbootjwt05032023.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import com.empresa.postgresqlspringbootjwt05032023.services.CredentialService;
import com.empresa.postgresqlspringbootjwt05032023.models.Credential;

@CrossOrigin
@RestController
@RequestMapping("/auth")
public class AuthController {

    private CredentialService credentialService;

    public AuthController(CredentialService credentialService) {
        this.credentialService = credentialService;
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody Credential credential) {
        // System.out.println(credential.getEmail());
        // System.out.println(credential.getPassword());

        String email = credential.getEmail();
        Credential credencialByEmail = credentialService.getCredentialByEmail(email);

        if (credencialByEmail.getEmail() == null) {
            return new ResponseEntity<>("The email " + email + " was not found", HttpStatus.OK);
        }

        return new ResponseEntity<>(credencialByEmail, HttpStatus.OK);
    }
}