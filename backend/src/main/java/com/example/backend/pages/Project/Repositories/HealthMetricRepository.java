package com.example.backend.pages.Project.Repositories;

import com.example.backend.pages.Project.models.HealthMetric;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HealthMetricRepository extends JpaRepository<HealthMetric, Long> {
}
