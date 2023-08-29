package com.empresa.postgresqlspringbootjwt05032023.responses;

import java.util.List;

import com.empresa.postgresqlspringbootjwt05032023.models.Expertise;

public class ExpertiseResponse {
    private boolean sqlExecute;
    private String sqlResponse;
    private List<Expertise> expertises;

    public boolean getSqlExecute() {
        return this.sqlExecute;
    }

    public void setSqlExecute(boolean sqlExecute) {
        this.sqlExecute = sqlExecute;
    }

    public String getSqlResponse() {
        return this.sqlResponse;
    }

    public void setSqlResponse(String sqlResponse) {
        this.sqlResponse = sqlResponse;
    }

    public List<Expertise> getExpertises() {
        return this.expertises;
    }

    public void setExpertises(List<Expertise> expertises) {
        this.expertises = expertises;
    }
}