package com.example.backend.Dashboard.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.Dashboard.model.Alert;

public interface AlertRepository extends JpaRepository<Alert, Long> {
}
