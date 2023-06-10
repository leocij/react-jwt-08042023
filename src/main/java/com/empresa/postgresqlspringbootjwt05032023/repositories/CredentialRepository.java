package com.empresa.postgresqlspringbootjwt05032023.repositories;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.ArrayList;

import com.empresa.postgresqlspringbootjwt05032023.models.Credential;

public class CredentialRepository {

    public List<Credential> findAll() {
        List<Credential> credentials = new ArrayList<Credential>();

        try {
            String url = "jdbc:postgresql://localhost:5432/postgresql_springboot_jwt_05032023_db";
            String myUser = "postgres";
            String myPassword = "postgres";
            String sql_query = "select * from credentials;";
            Connection connection = DriverManager.getConnection(url, myUser, myPassword);
            PreparedStatement preparedStatement = connection.prepareStatement(sql_query);
            ResultSet resultSet = preparedStatement.executeQuery();

            while (resultSet.next()) {
                Credential credential = new Credential();
                credential.setId(resultSet.getInt("id"));
                credential.setEmail(resultSet.getString("email"));
                credential.setPassword(resultSet.getString("password"));
                credential.setCreatedAt(resultSet.getTimestamp("created_at"));
                credential.setUpdatedAt(resultSet.getTimestamp("updated_at"));
                credentials.add(credential);
            }
        } catch (SQLException e) {
            e.printStackTrace(System.err);
        }

        return credentials;
    }

    public Credential getCredentialByEmail(String email) {

        Credential credential = new Credential();

        try {
            String url = "jdbc:postgresql://localhost:5432/postgresql_springboot_jwt_05032023_db";
            String myUser = "postgres";
            String myPassword = "postgres";
            String sql_query = "select * from credentials where email = ? limit 1;";
            Connection connection = DriverManager.getConnection(url, myUser, myPassword);
            PreparedStatement preparedStatement = connection.prepareStatement(sql_query);
            preparedStatement.setString(1, email);
            ResultSet resultSet = preparedStatement.executeQuery();

            while (resultSet.next()) {
                credential.setId(resultSet.getInt("id"));
                credential.setEmail(resultSet.getString("email"));
                credential.setPassword(resultSet.getString("password"));
                credential.setCreatedAt(resultSet.getTimestamp("created_at"));
                credential.setUpdatedAt(resultSet.getTimestamp("updated_at"));
            }
        } catch (SQLException e) {
            e.printStackTrace(System.err);
        }

        return credential;
    }

    public void save(Credential credential) {
        try {
            String url = "jdbc:postgresql://localhost:5432/postgresql_springboot_jwt_05032023_db";
            String myUser = "postgres";
            String myPassword = "postgres";
            String sql_query = "insert into credentials (user_id, email, password, created_at, updated_at) values (?, ?, ?, current_timestamp, current_timestamp);";
            Connection connection = DriverManager.getConnection(url, myUser, myPassword);
            PreparedStatement preparedStatement = connection.prepareStatement(sql_query);
            preparedStatement.setInt(1, credential.getUserId());
            preparedStatement.setString(2, credential.getEmail());
            preparedStatement.setString(3, credential.getPassword());
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace(System.err);
        }
    }
}