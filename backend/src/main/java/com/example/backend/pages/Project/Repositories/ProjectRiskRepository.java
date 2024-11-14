package com.example.backend.pages.Project.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.pages.Project.models.ProjectRisk;

@Repository
public interface ProjectRiskRepository extends JpaRepository<ProjectRisk, Long> {
}