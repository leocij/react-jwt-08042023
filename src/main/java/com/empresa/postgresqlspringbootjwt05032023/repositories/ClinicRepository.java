package com.empresa.postgresqlspringbootjwt05032023.repositories;

import java.sql.SQLException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.List;
import java.util.ArrayList;

import com.empresa.postgresqlspringbootjwt05032023.models.Clinic;
import com.empresa.postgresqlspringbootjwt05032023.responses.ClinicResponse;

public class ClinicRepository {

    public ClinicResponse findAll() {
        ClinicResponse clinicResponse = new ClinicResponse();
        List<Clinic> clinics = new ArrayList<Clinic>();

        try {
            String dbUrl = "jdbc:postgresql://localhost:5432/postgresql_springboot_jwt_05032023_db";
            String dbUser = "postgres";
            String dbPassword = "postgres";
            String sqlQuery = "select * from clinics;";
            Connection connection = DriverManager.getConnection(dbUrl, dbUser, dbPassword);
            PreparedStatement preparedStatement = connection.prepareStatement(sqlQuery);
            ResultSet resultSet = preparedStatement.executeQuery();

            while (resultSet.next()) {
                Clinic clinic = new Clinic();
                clinic.setId(resultSet.getInt("id"));
                clinic.setCnpj(resultSet.getString("cnpj"));
                clinic.setCorporateName(resultSet.getString("corporate_name"));
                clinic.setCreatedAt(resultSet.getTimestamp("created_at"));
                clinic.setUpdatedAt(resultSet.getTimestamp("updated_at"));
                clinics.add(clinic);
            }

            clinicResponse.setClinics(clinics);
            clinicResponse.setSqlResponse("Successfully");
            clinicResponse.setSqlExecute(true);
        } catch (SQLException e) {
            e.printStackTrace(System.err);
            clinicResponse.setSqlResponse(e.getMessage());
            clinicResponse.setSqlExecute(false);
        }

        return clinicResponse;
    }

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