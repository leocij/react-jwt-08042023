package com.empresa.postgresqlspringbootjwt05032023.models;

import java.util.Date;

public class Clinic {
    private int id;
    private String cnpj;
    private String corporateName;
    private Date createdAt;
    private Date updatedAt;

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCnpj() {
        return this.cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getCorporateName() {
        return this.corporateName;
    }

    public void setCorporateName(String corporateName) {
        this.corporateName = corporateName;
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
}