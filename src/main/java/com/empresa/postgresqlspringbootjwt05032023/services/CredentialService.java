package com.empresa.postgresqlspringbootjwt05032023.services;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.empresa.postgresqlspringbootjwt05032023.repositories.CredentialRepository;
import com.empresa.postgresqlspringbootjwt05032023.models.Credential;

@Service
public class CredentialService {

    private PasswordEncoder passwordEncoder;

    public CredentialService(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    CredentialRepository credentialRepository = new CredentialRepository();
    
    public void store(Credential credential) {

        // System.out.println(credential.getPassword());
        String password = credential.getPassword();
        String bcryptPassword = passwordEncoder.encode(password);
        // System.out.println(bcryptPassword);
        credential.setPassword(bcryptPassword);

        credentialRepository.save(credential);
    }
}