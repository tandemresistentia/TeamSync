package com.example.backend.pages.Resources.models;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
@Table(name = "resources")
public class Resource {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String initials;
    private String department;
    
    @ElementCollection
    private List<String> skills;
}
