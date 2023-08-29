package com.empresa.postgresqlspringbootjwt05032023.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import com.empresa.postgresqlspringbootjwt05032023.models.Clinic;
import com.empresa.postgresqlspringbootjwt05032023.responses.ClinicResponse;
import com.empresa.postgresqlspringbootjwt05032023.services.ClinicService;

@CrossOrigin
@RestController
@RequestMapping("/clinics")
public class ClinicController {

    ClinicService clinicService = new ClinicService();

    @GetMapping
    public ResponseEntity<ClinicResponse> index() {
        ClinicResponse clinicResponse = clinicService.index();
        if (clinicResponse.getSqlExecute()) {
            return new ResponseEntity<ClinicResponse>(clinicResponse, HttpStatus.OK);
        } else {
            return new ResponseEntity<ClinicResponse>(clinicResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping
    public ResponseEntity<ClinicResponse> store(@RequestBody Clinic clinic) {
        ClinicResponse clinicResponse = clinicService.store(clinic);
        if (clinicResponse.getSqlExecute()) {
            return new ResponseEntity<ClinicResponse>(clinicResponse, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<ClinicResponse>(clinicResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}