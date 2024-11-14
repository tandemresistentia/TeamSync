package com.example.backend.pages.Teams.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.pages.Teams.model.Leave;

public interface LeaveRepository extends JpaRepository<Leave, Long> {
}

