package com.empresa.postgresqlspringbootjwt05032023.repositories;

import java.sql.SQLException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

import com.empresa.postgresqlspringbootjwt05032023.models.Clinic;
import com.empresa.postgresqlspringbootjwt05032023.models.ClinicResponse;

public class ClinicRepository {
    public ClinicResponse save(Clinic clinic) {
        ClinicResponse clinicResponse = new ClinicResponse();

        try {
            String dbUrl = "jdbc:postgresql://localhost:5432/postgresql_springboot_jwt_05032023_db";
            String dbUser = "postgres";
            String dbPassword = "postgres";
            String sqlQuery = ""
            + "insert into clinics ("
            + "cnpj,"
            + "corporate_name,"
            + "created_at,"
            + "updated_at"
            + ") values ("
            + "?,"
            + "?,"
            + "current_timestamp,"
            + "current_timestamp"
            + ");";
            Connection connection = DriverManager.getConnection(dbUrl, dbUser, dbPassword);
            PreparedStatement preparedStatement = connection.prepareStatement(sqlQuery);
            preparedStatement.setString(1, clinic.getCnpj());
            preparedStatement.setString(2, clinic.getCorporateName());
            preparedStatement.executeUpdate();
            clinicResponse.setSqlResponse("Successfully Created");
            clinicResponse.setSqlExecute(true);
        } catch (SQLException e) {
            e.printStackTrace(System.err);
            clinicResponse.setSqlResponse(e.getMessage());
            clinicResponse.setSqlExecute(false);
        }

        return clinicResponse;
    }
}