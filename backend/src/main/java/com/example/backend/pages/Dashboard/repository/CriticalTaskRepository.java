package com.example.backend.pages.Dashboard.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.pages.Dashboard.model.CriticalTask;

import java.util.List;

@Repository
public interface CriticalTaskRepository extends JpaRepository<CriticalTask, Long> {
    List<CriticalTask> findByPriorityOrderByDueDateAsc(String priority);
    List<CriticalTask> findByDepartmentOrderByPriorityDesc(String department);
    List<CriticalTask> findByAssigneeOrderByDueDateAsc(String assignee);
}