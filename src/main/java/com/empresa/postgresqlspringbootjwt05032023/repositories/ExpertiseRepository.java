package com.empresa.postgresqlspringbootjwt05032023.repositories;

import java.sql.SQLException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.List;
import java.util.ArrayList;

import com.empresa.postgresqlspringbootjwt05032023.models.Expertise;
import com.empresa.postgresqlspringbootjwt05032023.responses.ExpertiseResponse;

public class ExpertiseRepository {

    // public ExpertiseResponse findAll() {
    //     ExpertiseResponse expertiseResponse = new ExpertiseResponse();
    //     List<Expertise> expertises = new ArrayList<Expertise>();

    //     try {
    //         String dbUrl = "jdbc:postgresql://localhost:5432/postgresql_springboot_jwt_05032023_db";
    //         String dbUser = "postgres";
    //         String dbPassword = "postgres";
    //         String sqlQuery = "select * from expertises;";
    //         Connection connection = DriverManager.getConnection(dbUrl, dbUser, dbPassword);
    //         PreparedStatement preparedStatement = connection.prepareStatement(sqlQuery);
    //         ResultSet resultSet = preparedStatement.executeQuery();

    //         while (resultSet.next()) {
    //             Expertise expertise = new Expertise();
    //             expertise.setId(resultSet.getInt("id"));
    //             expertise.setCnpj(resultSet.getString("cnpj"));
    //             expertise.setCorporateName(resultSet.getString("corporate_name"));
    //             expertise.setCreatedAt(resultSet.getTimestamp("created_at"));
    //             expertise.setUpdatedAt(resultSet.getTimestamp("updated_at"));
    //             expertises.add(expertise);
    //         }

    //         expertiseResponse.setexpertises(expertises);
    //         expertiseResponse.setSqlResponse("Successfully");
    //         expertiseResponse.setSqlExecute(true);
    //     } catch (SQLException e) {
    //         e.printStackTrace(System.err);
    //         expertiseResponse.setSqlResponse(e.getMessage());
    //         expertiseResponse.setSqlExecute(false);
    //     }

    //     return expertiseResponse;
    // }

    public ExpertiseResponse save(Expertise expertise) {
        ExpertiseResponse expertiseResponse = new ExpertiseResponse();

        try {
            String dbUrl = "jdbc:postgresql://localhost:5432/postgresql_springboot_jwt_05032023_db";
            String dbUser = "postgres";
            String dbPassword = "postgres";
            String sqlQuery = ""
            + "insert into expertises ("
            + "expertise,"
            + "created_at,"
            + "updated_at"
            + ") values ("
            + "?,"
            + "current_timestamp,"
            + "current_timestamp"
            + ");";
            Connection connection = DriverManager.getConnection(dbUrl, dbUser, dbPassword);
            PreparedStatement preparedStatement = connection.prepareStatement(sqlQuery);
            preparedStatement.setString(1, expertise.getExpertise());
            preparedStatement.executeUpdate();
            expertiseResponse.setSqlResponse("Successfully Created");
            expertiseResponse.setSqlExecute(true);
        } catch (SQLException e) {
            e.printStackTrace(System.err);
            expertiseResponse.setSqlResponse(e.getMessage());
            expertiseResponse.setSqlExecute(false);
        }

        return expertiseResponse;
    }
}