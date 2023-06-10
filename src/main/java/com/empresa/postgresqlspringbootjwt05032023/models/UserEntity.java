package com.empresa.postgresqlspringbootjwt05032023.models;

import java.util.Date;
import java.util.List;
import com.empresa.postgresqlspringbootjwt05032023.models.Credential;

public class UserEntity {
    private int id;
    private String name;
    private Date createdAt;
    private Date updatedAt;
    private List<Credential> credentials;

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getCreatedAt() {
        return this.createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return this.updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public List<Credential> getCredentials() {
        return this.credentials;
    }

    public void setCredentials(List<Credential> credentials) {
        this.credentials = credentials;
    }
}