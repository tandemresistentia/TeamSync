package com.example.backend.pages.Teams.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.pages.Teams.model.TeamMember;

public interface TeamMemberRepository extends JpaRepository<TeamMember, Long> {
}

