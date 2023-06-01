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
import com.empresa.postgresqlspringbootjwt05032023.models.CheckToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.http.HttpHeaders;
import io.jsonwebtoken.Jwts;

@CrossOrigin
@RestController
@RequestMapping("/auth")
public class AuthController {

    private CredentialService credentialService;

    public AuthController(CredentialService credentialService) {
        this.credentialService = credentialService;
    }

    private CheckToken checkTokenResponse(Boolean statusToken, String statusError) {
        CheckToken checkToken = new CheckToken();
        checkToken.setStatusToken(statusToken);
        checkToken.setStatusError(statusError);
        return checkToken;
    }

    @GetMapping("/check-token")
    public ResponseEntity<?> checkToken(@RequestHeader HttpHeaders httpHeaders) {

        // System.out.println("AuthController ---> " + httpHeaders);
        // System.out.println(httpHeaders.getFirst("authorization"));
        String authorization = httpHeaders.getFirst("authorization");

        if (authorization == null) {
            return new ResponseEntity<>(checkTokenResponse(false, "Authorization is empty"), HttpStatus.OK);
        }

        // System.out.println(authorization.split(" ")[0]);
        if (!authorization.split(" ")[0].equals("Bearer")) {
            return new ResponseEntity<>(checkTokenResponse(false, "Authorization type Bearer was not sent"), HttpStatus.OK);
        }

        String token = authorization.split(" ")[1];

        try {
            Jwts.parser().setSigningKey("SECRET_KEY").parseClaimsJws(token);
            return new ResponseEntity<>(checkTokenResponse(true, ""), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(checkTokenResponse(false, e.getMessage()), HttpStatus.OK);
        }
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody Credential credential) {
        // System.out.println(credential.getEmail());
        // System.out.println(credential.getPassword());

        String email = credential.getEmail();
        Credential credencialByEmail = credentialService.getCredentialByEmail(email);

        if (credencialByEmail.getEmail() == null) {
            return new ResponseEntity<>("The email " + email + " was not found", HttpStatus.FORBIDDEN);
        }

        String password = credential.getPassword();
        String passwordByEmail = credencialByEmail.getPassword();
        Boolean passwordValidated = credentialService.validatePassword(password, passwordByEmail);

        if (!passwordValidated) {
            return new ResponseEntity<>("Invalid password", HttpStatus.FORBIDDEN);
        }

        String token = credentialService.generateToken(credential);

        return new ResponseEntity<>(token, HttpStatus.OK);
    }
}