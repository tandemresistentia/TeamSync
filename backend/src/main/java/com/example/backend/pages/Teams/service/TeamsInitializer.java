package com.example.backend.pages.Teams.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.pages.Teams.model.*;
import com.example.backend.pages.Teams.repository.*;

import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;

import java.util.*;

@Service
public class TeamsInitializer {
    @Autowired
    private TeamMemberRepository teamMemberRepository;
    @Autowired
    private LeaveRepository leaveRepository;

    public void init() {
        initializeTeamMembers();
        initializeLeaveRequests();
    }

    @Transactional
    private void initializeTeamMembers() {
        List<TeamMember> members = Arrays.asList(
            // Development Team
            TeamMember.builder()
                .name("John Doe")
                .role("Senior Frontend Developer")
                .department("development")
                .availability("Available")
                .skills(Arrays.asList("React", "Vue.js", "TypeScript", "TailwindCSS", "Jest"))
                .build(),
            
            TeamMember.builder()
                .name("Jane Smith")
                .role("Backend Lead")
                .department("development")
                .availability("In Meeting")
                .skills(Arrays.asList("Java", "Spring Boot", "PostgreSQL", "Docker", "AWS"))
                .build(),
            
            TeamMember.builder()
                .name("Michael Johnson")
                .role("DevOps Engineer")
                .department("development")
                .availability("Available")
                .skills(Arrays.asList("Kubernetes", "Jenkins", "AWS", "Terraform", "Linux"))
                .build(),
            
            TeamMember.builder()
                .name("Sarah Wilson")
                .role("Full Stack Developer")
                .department("development")
                .availability("On Leave")
                .skills(Arrays.asList("Angular", "Node.js", "MongoDB", "Express", "Python"))
                .build(),

            // Design Team
            TeamMember.builder()
                .name("Emily Brown")
                .role("UI/UX Lead")
                .department("design")
                .availability("Available")
                .skills(Arrays.asList("Figma", "Adobe XD", "User Research", "Wireframing", "Prototyping"))
                .build(),
            
            TeamMember.builder()
                .name("David Lee")
                .role("Product Designer")
                .department("design")
                .availability("In Meeting")
                .skills(Arrays.asList("Sketch", "InVision", "User Testing", "Design Systems", "Adobe CC"))
                .build(),
            
            TeamMember.builder()
                .name("Lisa Chen")
                .role("Visual Designer")
                .department("design")
                .availability("Available")
                .skills(Arrays.asList("Illustrator", "Photoshop", "Typography", "Brand Design", "Motion Design"))
                .build(),

            // Marketing Team
            TeamMember.builder()
                .name("James Taylor")
                .role("Marketing Lead")
                .department("marketing")
                .availability("Available")
                .skills(Arrays.asList("Strategy", "Analytics", "Campaign Management", "SEO", "Content Planning"))
                .build(),
            
            TeamMember.builder()
                .name("Maria Garcia")
                .role("Content Strategist")
                .department("marketing")
                .availability("On Leave")
                .skills(Arrays.asList("Content Writing", "SEO", "Social Media", "Email Marketing", "Analytics"))
                .build(),
            
            TeamMember.builder()
                .name("Robert Martinez")
                .role("Digital Marketing Specialist")
                .department("marketing")
                .availability("Available")
                .skills(Arrays.asList("PPC", "Social Media Ads", "Google Analytics", "Email Campaigns", "Marketing Automation"))
                .build()
        );

        teamMemberRepository.saveAll(members);
    }


    private void initializeLeaveRequests() {
        List<Leave> leaveRequests = new ArrayList<>();

        Leave leave1 = new Leave();
        leave1.setId(1L);
        leave1.setMember("Jane Smith");
        leave1.setType("Vacation");
        leave1.setDates("Dec 20-27");
        leaveRequests.add(leave1);

        Leave leave2 = new Leave();
        leave2.setId(2L);
        leave2.setMember("Mike Johnson");
        leave2.setType("Personal");
        leave2.setDates("Dec 15");
        leaveRequests.add(leave2);

        Leave leave3 = new Leave();
        leave3.setId(3L);
        leave3.setMember("John Doe");
        leave3.setType("Sick Leave");
        leave3.setDates("Dec 10");
        leaveRequests.add(leave3);

        Leave leave4 = new Leave();
        leave4.setId(4L);
        leave4.setMember("Sarah Wilson");
        leave4.setType("Training");
        leave4.setDates("Dec 18-19");
        leaveRequests.add(leave4);

        Leave leave5 = new Leave();
        leave5.setId(5L);
        leave5.setMember("David Brown");
        leave5.setType("Vacation");
        leave5.setDates("Dec 22-26");
        leaveRequests.add(leave5);

        leaveRepository.saveAll(leaveRequests);
    }
}