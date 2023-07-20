package com.empresa.postgresqlspringbootjwt05032023.services;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import java.util.List;
import java.util.Date;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import com.empresa.postgresqlspringbootjwt05032023.repositories.CredentialRepository;
import com.empresa.postgresqlspringbootjwt05032023.models.Credential;

@Service
public class CredentialService {

    private PasswordEncoder passwordEncoder;
    // private AuthenticationManager authenticationManager;

    public CredentialService(PasswordEncoder passwordEncoder/* , AuthenticationManager authenticationManager */) {
        this.passwordEncoder = passwordEncoder;
        // this.authenticationManager = authenticationManager;
    }

    CredentialRepository credentialRepository = new CredentialRepository();

    public List<Credential> index() {
        return credentialRepository.findAll();
    }

    public Credential getCredentialByEmail(String email) {
        return credentialRepository.getCredentialByEmail(email);
    }
    
    public String store(Credential credential) {

        // System.out.println(credential.getPassword());
        String password = credential.getPassword();
        String bcryptPassword = passwordEncoder.encode(password);
        // System.out.println(bcryptPassword);
        credential.setPassword(bcryptPassword);

        return credentialRepository.save(credential);
    }

    public Boolean validatePassword(String password, String passwordByEmail) {
        return this.passwordEncoder.matches(password, passwordByEmail);
    }

    public String generateToken(Credential credential) {
        String email = credential.getEmail();

        // If error add at build.gradle
        // https://mvnrepository.com/artifact/javax.xml.bind/jaxb-api
	    // implementation 'javax.xml.bind:jaxb-api:2.2.4'

        String token = Jwts.builder()
            .setSubject(email)
            // issuedAt -> Criado em
            .setIssuedAt(new Date())
            // expiration -> expira em
            .setExpiration(new Date((new Date()).getTime() + 60 * 60 * 24 * 1000))
            .signWith(SignatureAlgorithm.HS256, "SECRET_KEY")
            .compact();

        return token;
    }
}