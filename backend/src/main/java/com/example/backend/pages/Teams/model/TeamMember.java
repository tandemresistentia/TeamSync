package com.example.backend.pages.Teams.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "team_members")
public class TeamMember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String role;
    private String department;
    private String availability;
    
    @ElementCollection
    @CollectionTable(name = "member_skills", joinColumns = @JoinColumn(name = "member_id"))
    @Column(name = "skill")
    private List<String> skills;
}