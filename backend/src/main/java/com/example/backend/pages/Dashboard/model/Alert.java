package com.example.backend.pages.Dashboard.model;

import lombok.Data;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
@Data
public class Alert {
    @Id
    private Long id;
    private String type;
    private String message;
}
