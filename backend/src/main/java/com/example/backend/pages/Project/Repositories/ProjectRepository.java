package com.example.backend.pages.Project.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.pages.Project.models.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
}