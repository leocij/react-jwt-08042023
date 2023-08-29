package com.empresa.postgresqlspringbootjwt05032023.services;

import com.empresa.postgresqlspringbootjwt05032023.models.Expertise;
import com.empresa.postgresqlspringbootjwt05032023.responses.ExpertiseResponse;
import com.empresa.postgresqlspringbootjwt05032023.repositories.ExpertiseRepository;

public class ExpertiseService {

    ExpertiseRepository expertiseRepository = new ExpertiseRepository();

    public ExpertiseResponse store(Expertise expertise) {
        return expertiseRepository.save(expertise);
    }
}