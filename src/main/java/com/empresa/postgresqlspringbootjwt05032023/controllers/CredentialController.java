package com.empresa.postgresqlspringbootjwt05032023.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

import com.empresa.postgresqlspringbootjwt05032023.services.CredentialService;
import com.empresa.postgresqlspringbootjwt05032023.models.Credential;

@CrossOrigin
@RestController
@RequestMapping("/credentials")
public class CredentialController {

    private CredentialService credentialService;

    public CredentialController(CredentialService credentialService) {
        this.credentialService = credentialService;
    }

    @GetMapping
    public List<Credential> index() {
        List<Credential> credentials = credentialService.index();

        return credentials;
    }

    @PostMapping
    public void store(@RequestBody Credential credential) {
        // System.out.println(credential.getEmail());
        // System.out.println(credential.getPassword());

        credentialService.store(credential);
    }
}