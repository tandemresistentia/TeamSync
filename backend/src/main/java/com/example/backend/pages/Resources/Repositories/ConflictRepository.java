package com.example.backend.pages.Resources.Repositories;

import com.example.backend.pages.Resources.models.Conflict;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConflictRepository extends JpaRepository<Conflict, Long> {
}
