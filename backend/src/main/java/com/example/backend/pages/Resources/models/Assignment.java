package com.example.backend.pages.Resources.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "assignments")
public class Assignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Long resourceId;
    private String project;
    private String date;
    private int hours;
    private String type;
}
