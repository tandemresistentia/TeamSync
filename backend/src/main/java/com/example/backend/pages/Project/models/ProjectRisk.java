package com.example.backend.pages.Project.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "project_risks")
public class ProjectRisk {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String level;
    private String description;
    private String impact;
}