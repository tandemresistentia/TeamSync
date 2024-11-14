package com.example.backend.pages.Project.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "health_metrics")
public class HealthMetric {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String title;
    private String value;
    private String trend;
    private int progress;
    private String trendIcon;
    private String trendColor;
    private String progressColor;
}

