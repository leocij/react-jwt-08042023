package com.empresa.postgresqlspringbootjwt05032023.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.empresa.postgresqlspringbootjwt05032023.services.CredentialService;
import com.empresa.postgresqlspringbootjwt05032023.models.Credential;

@CrossOrigin
@RestController
@RequestMapping("/credentials")
public class CredentialController {

    CredentialService credentialService = new CredentialService();

    @PostMapping
    public void store(@RequestBody Credential credential) {
        // System.out.println(credential.getEmail());
        // System.out.println(credential.getPassword());

        credentialService.store(credential);
    }
}