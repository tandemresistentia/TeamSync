package com.example.backend.pages.Resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/resources")
@CrossOrigin(origins = "*")
public class ResourceController {
    @Autowired
    private ResourceService resourceService;
    
    @GetMapping("/resources")
    public ResponseEntity<?> getAllResources() {
        return ResponseEntity.ok(resourceService.getAllResources());
    }
    
    @GetMapping("/departments")
    public ResponseEntity<?> getAllDepartments() {
        return ResponseEntity.ok(resourceService.getAllDepartments());
    }
    
    @GetMapping("/assignments")
    public ResponseEntity<?> getAllAssignments() {
        return ResponseEntity.ok(resourceService.getAllAssignments());
    }
    
    @GetMapping("/conflicts")
    public ResponseEntity<?> getAllConflicts() {
        return ResponseEntity.ok(resourceService.getAllConflicts());
    }
}
