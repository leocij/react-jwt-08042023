package com.empresa.postgresqlspringbootjwt05032023.services;

import com.empresa.postgresqlspringbootjwt05032023.models.Clinic;
import com.empresa.postgresqlspringbootjwt05032023.models.ClinicResponse;
import com.empresa.postgresqlspringbootjwt05032023.repositories.ClinicRepository;

public class ClinicService {

    ClinicRepository clinicRepository = new ClinicRepository();

    public ClinicResponse index() {
        return clinicRepository.findAll();
    }

    public ClinicResponse store(Clinic clinic) {
        return clinicRepository.save(clinic);
    }
}