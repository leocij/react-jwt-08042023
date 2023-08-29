package com.empresa.postgresqlspringbootjwt05032023.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import com.empresa.postgresqlspringbootjwt05032023.models.Expertise;
import com.empresa.postgresqlspringbootjwt05032023.responses.ExpertiseResponse;
import com.empresa.postgresqlspringbootjwt05032023.services.ExpertiseService;

@CrossOrigin
@RestController
@RequestMapping("/expertises")
public class ExpertiseController {

    ExpertiseService expertiseService = new ExpertiseService();

    @PostMapping
    public ResponseEntity<ExpertiseResponse> store(@RequestBody Expertise expertise) {
        ExpertiseResponse expertiseResponse = expertiseService.store(expertise);
        if (expertiseResponse.getSqlExecute()) {
            return new ResponseEntity<ExpertiseResponse>(expertiseResponse, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<ExpertiseResponse>(expertiseResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}