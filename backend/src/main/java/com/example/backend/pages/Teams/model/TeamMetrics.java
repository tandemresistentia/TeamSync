package com.example.backend.pages.Teams.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TeamMetrics {
    private int totalMembers;
    private int joiningThisMonth;
    private int skillCoverage;
    private int plannedLeave;
}
