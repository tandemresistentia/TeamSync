package com.example.backend.pages.Resources;

import com.example.backend.pages.Resources.models.*;
import com.example.backend.pages.Resources.Repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import jakarta.annotation.PostConstruct;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAdjusters;
import java.util.*;

@Service
public class ResourceService {
    @Autowired
    private ResourceRepository resourceRepository;
    
    @Autowired
    private DepartmentRepository departmentRepository;
    
    @Autowired
    private AssignmentRepository assignmentRepository;
    
    @Autowired
    private ConflictRepository conflictRepository;

    public boolean isDataEmpty() {
        return resourceRepository.count() == 0;
    }
    
@PostConstruct
@Transactional
public void initializeData() {
    if (!isDataEmpty()) {
        return;
    }

    // Initialize Resources
    List<Resource> resources = new ArrayList<>();
    
    // Development Team
    resources.add(createResource("John Doe", "Development", 
        Arrays.asList("React", "Node.js", "TypeScript", "AWS")));
    resources.add(createResource("Sarah Wilson", "Development", 
        Arrays.asList("Python", "Django", "PostgreSQL", "Docker")));
    resources.add(createResource("Mike Chen", "Development", 
        Arrays.asList("Java", "Spring Boot", "Kubernetes", "MongoDB")));
    resources.add(createResource("Emma Davis", "Development", 
        Arrays.asList("Angular", "Firebase", "GCP", "DevOps")));
    resources.add(createResource("Alex Kumar", "Development", 
        Arrays.asList("Vue.js", "Laravel", "MySQL", "Redis")));

    // Design Team
    resources.add(createResource("Jane Smith", "Design", 
        Arrays.asList("UI/UX", "Figma", "Adobe XD", "Prototyping")));
    resources.add(createResource("David Lee", "Design", 
        Arrays.asList("Product Design", "Sketch", "InVision", "User Research")));
    resources.add(createResource("Maria Garcia", "Design", 
        Arrays.asList("Visual Design", "Illustrator", "Motion Design", "Design Systems")));
    
    // Marketing Team
    resources.add(createResource("Tom Brown", "Marketing", 
        Arrays.asList("Content Strategy", "SEO", "Analytics", "Social Media")));
    resources.add(createResource("Lisa Wong", "Marketing", 
        Arrays.asList("Email Marketing", "CRM", "Marketing Automation", "Copywriting")));

    resourceRepository.saveAll(resources);

    // Initialize Departments
    List<Department> departments = new ArrayList<>();
    
    Department dev = new Department();
    dev.setName("Development");
    dev.setUtilization(85);
    dev.setCapacity(200);
    dev.setAllocated(170);
    departments.add(dev);

    Department design = new Department();
    design.setName("Design");
    design.setUtilization(70);
    design.setCapacity(120);
    design.setAllocated(84);
    departments.add(design);

    Department marketing = new Department();
    marketing.setName("Marketing");
    marketing.setUtilization(75);
    marketing.setCapacity(80);
    marketing.setAllocated(60);
    departments.add(marketing);

    departmentRepository.saveAll(departments);

    // Initialize Assignments for the current week
    List<Assignment> assignments = new ArrayList<>();
    LocalDate monday = LocalDate.now().with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
    
    // Monday Assignments
    assignments.addAll(Arrays.asList(
        createAssignment(1L, "Website Redesign", monday, 6, "development"),
        createAssignment(1L, "Team Meeting", monday, 2, "meeting"),
        createAssignment(2L, "API Development", monday, 4, "development"),
        createAssignment(6L, "Mobile App UI", monday, 5, "design")
    ));

    // Tuesday Assignments
    LocalDate tuesday = monday.plusDays(1);
    assignments.addAll(Arrays.asList(
        createAssignment(3L, "Cloud Migration", tuesday, 8, "development"),
        createAssignment(4L, "DevOps Tasks", tuesday, 6, "development"),
        createAssignment(7L, "Design Review", tuesday, 4, "meeting"),
        createAssignment(9L, "Content Creation", tuesday, 7, "marketing")
    ));

    // Wednesday Assignments
    LocalDate wednesday = monday.plusDays(2);
    assignments.addAll(Arrays.asList(
        createAssignment(5L, "Backend Development", wednesday, 7, "development"),
        createAssignment(6L, "UX Research", wednesday, 6, "design"),
        createAssignment(8L, "Design Systems", wednesday, 5, "design"),
        createAssignment(10L, "Marketing Campaign", wednesday, 4, "marketing")
    ));

    // Thursday Assignments
    LocalDate thursday = monday.plusDays(3);
    assignments.addAll(Arrays.asList(
        createAssignment(1L, "Code Review", thursday, 4, "development"),
        createAssignment(2L, "Sprint Planning", thursday, 2, "meeting"),
        createAssignment(7L, "Prototype Development", thursday, 6, "design"),
        createAssignment(9L, "SEO Optimization", thursday, 8, "marketing")
    ));

    // Friday Assignments
    LocalDate friday = monday.plusDays(4);
    assignments.addAll(Arrays.asList(
        createAssignment(3L, "Testing", friday, 6, "development"),
        createAssignment(4L, "Deployment", friday, 4, "development"),
        createAssignment(8L, "Client Presentation", friday, 3, "meeting"),
        createAssignment(10L, "Analytics Review", friday, 5, "marketing")
    ));

    assignmentRepository.saveAll(assignments);

    // Initialize Conflicts
    List<Conflict> conflicts = new ArrayList<>();
    
    conflicts.add(createConflict(
        "overallocation",
        "John Doe is allocated for 12 hours on " + monday.format(DateTimeFormatter.ofPattern("MMM dd")),
        "high",
        Arrays.asList("John Doe"),
        monday.toString(),
        Arrays.asList("Website Redesign", "Team Meeting")
    ));

    conflicts.add(createConflict(
        "scheduling",
        "Overlapping meetings for Design Team on " + tuesday.format(DateTimeFormatter.ofPattern("MMM dd")),
        "medium",
        Arrays.asList("Jane Smith", "David Lee"),
        tuesday.toString(),
        Arrays.asList("Design Review", "Client Meeting")
    ));

    conflicts.add(createConflict(
        "timeoff",
        "Maria Garcia assigned work during approved time off on " + wednesday.format(DateTimeFormatter.ofPattern("MMM dd")),
        "high",
        Arrays.asList("Maria Garcia"),
        wednesday.toString(),
        Arrays.asList("Design Systems")
    ));

    conflictRepository.saveAll(conflicts);
}

private Resource createResource(String name, String department, List<String> skills) {
    Resource resource = new Resource();
    resource.setName(name);
    resource.setInitials(name.split(" ")[0].charAt(0) + "" + name.split(" ")[1].charAt(0));
    resource.setDepartment(department);
    resource.setSkills(skills);
    return resource;
}

private Assignment createAssignment(Long resourceId, String project, LocalDate date, int hours, String type) {
    Assignment assignment = new Assignment();
    assignment.setResourceId(resourceId);
    assignment.setProject(project);
    assignment.setDate(date.toString());
    assignment.setHours(hours);
    assignment.setType(type);
    return assignment;
}

private Conflict createConflict(String type, String message, String severity, List<String> resources, 
                              String date, List<String> projects) {
    Conflict conflict = new Conflict();
    conflict.setType(type);
    conflict.setMessage(message);
    conflict.setSeverity(severity);
    conflict.setResources(resources);
    conflict.setDate(date);
    conflict.setProjects(projects);
    return conflict;
}

    public List<Resource> getAllResources() {
        return resourceRepository.findAll();
    }

    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    public List<Assignment> getAllAssignments() {
        return assignmentRepository.findAll();
    }

    public List<Conflict> getAllConflicts() {
        return conflictRepository.findAll();
    }
}
