package com.example.backend.pages.Dashboard.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.backend.pages.Dashboard.model.*;
import com.example.backend.pages.Dashboard.repository.*;

import java.util.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {
    @Autowired
    private AlertRepository alertRepository;
    @Autowired
    private CriticalTaskRepository criticalTaskRepository;
    
    @GetMapping("/critical-tasks")
    public List<CriticalTask> getCriticalTasks() {
        return criticalTaskRepository.findAll();
    }

    @GetMapping("/alerts")
    public List<Alert> getAlerts() {
        return alertRepository.findAll();
    }

    @GetMapping("/productivity-chart")
    public Map<String, Object> getProductivityChart() {
        Map<String, Object> data = new HashMap<>();
        data.put("categories", Arrays.asList("Mon", "Tue", "Wed", "Thu", "Fri"));
        data.put("tasksCompleted", Arrays.asList(30, 40, 35, 50, 45));
        data.put("hoursWorked", Arrays.asList(45, 52, 49, 56, 50));
        return data;
    }

    @GetMapping("/resource-usage")
    public Map<String, Object> getResourceUsage() {
        Map<String, Object> data = new HashMap<>();
        data.put("categories", Arrays.asList("Server", "Storage", "Bandwidth", "CPU", "Memory"));
        data.put("usage", Arrays.asList(85, 72, 65, 89, 76));
        return data;
    }




}
