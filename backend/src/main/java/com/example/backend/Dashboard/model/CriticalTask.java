package com.example.backend.Dashboard.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;
import lombok.Data;

@Entity
@Data
public class CriticalTask {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String priority;
    private String dueDate;
    private String assignee;
    private String department;
    
    @Column(length = 1000)
    private String description;
    private String status;
}