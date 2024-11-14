package com.example.backend.pages.Resources.Repositories;

import com.example.backend.pages.Resources.models.Resource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResourceRepository extends JpaRepository<Resource, Long> {
}
