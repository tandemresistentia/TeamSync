package com.example.backend.pages.Teams.model;

import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data
@Builder
public class DepartmentCapacity {
    private List<Integer> departmentLoads;
}
