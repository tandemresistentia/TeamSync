package com.example.backend.pages.Resources.Repositories;

import com.example.backend.pages.Resources.models.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {
}
