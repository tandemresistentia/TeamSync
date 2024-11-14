package com.example.backend.pages.Teams.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.backend.pages.Teams.model.*;
import com.example.backend.pages.Teams.repository.TeamMemberRepository;
import com.example.backend.pages.Teams.service.TeamsService;

import java.util.List;

@RestController
@RequestMapping("/api/teams")
@CrossOrigin(origins = "*")
public class TeamsController {

    @Autowired
    private TeamsService teamsService;

    @GetMapping("/metrics")
    public ResponseEntity<TeamMetrics> getTeamMetrics() {
        return ResponseEntity.ok(teamsService.getTeamMetrics());
    }

    @Autowired
    private TeamMemberRepository teamMemberRepository;
    
    @GetMapping("/members")
    public ResponseEntity<List<TeamMember>> getTeamMembers() {
        List<TeamMember> members = teamMemberRepository.findAll();
        return ResponseEntity.ok(members);
    }

    @GetMapping("/leave")
    public ResponseEntity<List<Leave>> getUpcomingLeave() {
        return ResponseEntity.ok(teamsService.getUpcomingLeave());
    }

    @GetMapping("/skills-distribution")
    public ResponseEntity<SkillsDistribution> getSkillsDistribution() {
        return ResponseEntity.ok(teamsService.getSkillsDistribution());
    }

    @GetMapping("/capacity")
    public ResponseEntity<DepartmentCapacity> getDepartmentCapacity() {
        return ResponseEntity.ok(teamsService.getDepartmentCapacity());
    }
}
