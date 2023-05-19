package com.empresa.postgresqlspringbootjwt05032023.services;

import com.empresa.postgresqlspringbootjwt05032023.repositories.CredentialRepository;
import com.empresa.postgresqlspringbootjwt05032023.models.Credential;

public class CredentialService {

    CredentialRepository credentialRepository = new CredentialRepository();

    public void store(Credential credential) {
        credentialRepository.save(credential);
    }
}