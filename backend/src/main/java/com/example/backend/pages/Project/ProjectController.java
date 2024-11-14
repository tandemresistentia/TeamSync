package com.example.backend.pages.Project;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ProjectController {
    @Autowired
    private ProjectService projectService;
    
    @GetMapping("/projects")
    public ResponseEntity<?> getAllProjects() {
        return ResponseEntity.ok(projectService.getAllProjects());
    }
    
    @GetMapping("/health-metrics")
    public ResponseEntity<?> getAllHealthMetrics() {
        return ResponseEntity.ok(projectService.getAllHealthMetrics());
    }
    
    @GetMapping("/project-risks")
    public ResponseEntity<?> getAllProjectRisks() {
        return ResponseEntity.ok(projectService.getAllProjectRisks());
    }

}