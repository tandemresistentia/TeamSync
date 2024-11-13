package com.example.backend.Dashboard.service;

import com.example.backend.Dashboard.model.*;
import com.example.backend.Dashboard.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;
import java.util.*;

@Service
public class DataInitializer {
    @Autowired
    private AlertRepository alertRepository;
    @Autowired
    private CriticalTaskRepository criticalTaskRepository;

    @PostConstruct
    public void init() {
        initializeAlerts();
        initializeCriticalTasks();
    }

    private void initializeAlerts() {
        List<Alert> alerts = new ArrayList<>();

        Alert alert1 = new Alert();
        alert1.setId(1L);
        alert1.setType("warning");
        alert1.setMessage("3 team members are approaching capacity");
        alerts.add(alert1);

        Alert alert2 = new Alert();
        alert2.setId(2L);
        alert2.setType("info");
        alert2.setMessage("New project resources available");
        alerts.add(alert2);

        Alert alert3 = new Alert();
        alert3.setId(3L);
        alert3.setType("error");
        alert3.setMessage("Server capacity reaching critical levels");
        alerts.add(alert3);

        alertRepository.saveAll(alerts);
    }

    private void initializeCriticalTasks() {
        List<CriticalTask> tasks = new ArrayList<>();

        CriticalTask task1 = new CriticalTask();
        task1.setId(1L);
        task1.setName("Database Performance Optimization");
        task1.setPriority("high");
        task1.setDueDate("Today");
        task1.setAssignee("John Doe");
        task1.setDepartment("Development");
        task1.setDescription("Optimize database queries and indexes for improved performance");
        task1.setStatus("In Progress");
        tasks.add(task1);

        CriticalTask task2 = new CriticalTask();
        task2.setId(2L);
        task2.setName("Security Audit Implementation");
        task2.setPriority("high");
        task2.setDueDate("Tomorrow");
        task2.setAssignee("Sarah Williams");
        task2.setDepartment("Security");
        task2.setDescription("Implement security audit recommendations from last review");
        task2.setStatus("Pending");
        tasks.add(task2);

        CriticalTask task3 = new CriticalTask();
        task3.setId(3L);
        task3.setName("Client Meeting Preparation");
        task3.setPriority("medium");
        task3.setDueDate("Nov 15");
        task3.setAssignee("Mike Johnson");
        task3.setDepartment("Marketing");
        task3.setDescription("Prepare presentation and demo for client meeting");
        task3.setStatus("Not Started");
        tasks.add(task3);

        CriticalTask task4 = new CriticalTask();
        task4.setId(4L);
        task4.setName("API Documentation Update");
        task4.setPriority("medium");
        task4.setDueDate("Nov 16");
        task4.setAssignee("Jane Smith");
        task4.setDepartment("Development");
        task4.setDescription("Update API documentation with new endpoints");
        task4.setStatus("In Progress");
        tasks.add(task4);

        CriticalTask task5 = new CriticalTask();
        task5.setId(5L);
        task5.setName("System Backup Verification");
        task5.setPriority("high");
        task5.setDueDate("Today");
        task5.setAssignee("John Doe");
        task5.setDepartment("Operations");
        task5.setDescription("Verify system backup integrity and recovery procedures");
        task5.setStatus("Pending");
        tasks.add(task5);

        criticalTaskRepository.saveAll(tasks);
    }
}