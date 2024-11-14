package com.example.backend.pages.Teams.service;

import org.springframework.stereotype.Service;

import com.example.backend.pages.Teams.model.*;

import java.util.*;

@Service
public class TeamsService {

    public TeamMetrics getTeamMetrics() {
        return TeamMetrics.builder()
            .totalMembers(24)
            .joiningThisMonth(3)
            .skillCoverage(85)
            .plannedLeave(5)
            .build();
    }

    public List<TeamMember> getTeamMembers() {
        return Arrays.asList(
            TeamMember.builder()
                .id(1L)
                .name("John Doe")
                .role("Senior Developer")
                .department("development")
                .availability("Available")
                .skills(Arrays.asList("React", "Node.js", "TypeScript", "AWS"))
                .build(),
            TeamMember.builder()
                .id(2L)
                .name("Jane Smith")
                .role("UI/UX Designer")
                .department("design")
                .availability("On Leave")
                .skills(Arrays.asList("Figma", "Adobe XD", "User Research", "Prototyping"))
                .build()
        );
    }

    public List<Leave> getUpcomingLeave() {
        return Arrays.asList(
            Leave.builder()
                .id(1L)
                .member("Jane Smith")
                .type("Vacation")
                .dates("Dec 20-27")
                .build(),
            Leave.builder()
                .id(2L)
                .member("Mike Johnson")
                .type("Personal")
                .dates("Dec 15")
                .build()
        );
    }

    public SkillsDistribution getSkillsDistribution() {
        return SkillsDistribution.builder()
            .skillLevels(Arrays.asList(80, 65, 45, 70, 60, 40))
            .build();
    }

    public DepartmentCapacity getDepartmentCapacity() {
        return DepartmentCapacity.builder()
            .departmentLoads(Arrays.asList(85, 65, 45))
            .build();
    }
}
