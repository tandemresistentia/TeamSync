package com.example.backend.pages.Dashboard.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.pages.Dashboard.model.Alert;

public interface AlertRepository extends JpaRepository<Alert, Long> {
}
