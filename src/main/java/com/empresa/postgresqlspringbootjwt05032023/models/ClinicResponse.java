package com.empresa.postgresqlspringbootjwt05032023.models;

public class ClinicResponse {
    private boolean sqlExecute;
    private String sqlResponse;

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
}