package com.example.backend.pages.Project.models;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;
import java.util.List;


@Data
@Entity
@Table(name = "projects")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private double budget;
    private double spent;
    private String budgetStatus;
    
    @Temporal(TemporalType.DATE)
    private Date startDate;
    
    @Temporal(TemporalType.DATE)
    private Date endDate;
    
    @OneToMany(cascade = CascadeType.ALL)
    private List<ProjectRisk> risks;
    
    @ElementCollection
    private List<String> resources;
}