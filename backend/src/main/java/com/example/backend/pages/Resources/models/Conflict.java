package com.example.backend.pages.Resources.models;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
@Table(name = "conflicts")
public class Conflict {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String type;
    private String message;
    private String severity;
    
    @ElementCollection
    private List<String> resources;
    
    private String date;
    
    @ElementCollection
    private List<String> projects;
}
