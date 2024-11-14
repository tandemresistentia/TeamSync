package com.example.backend.pages.Project;

import com.example.backend.pages.Project.models.Project;
import com.example.backend.pages.Project.models.HealthMetric;
import com.example.backend.pages.Project.models.ProjectRisk;
import com.example.backend.pages.Project.Repositories.ProjectRepository;
import com.example.backend.pages.Project.Repositories.HealthMetricRepository;
import com.example.backend.pages.Project.Repositories.ProjectRiskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import jakarta.annotation.PostConstruct;
import java.util.*;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;
    
    @Autowired
    private HealthMetricRepository healthMetricRepository;
    
    @Autowired
    private ProjectRiskRepository projectRiskRepository;

    public boolean isDataEmpty() {
        return projectRepository.count() == 0 &&
               healthMetricRepository.count() == 0 &&
               projectRiskRepository.count() == 0;
    }
    
    @Transactional
    public void resetData() {
        projectRepository.deleteAll();
        healthMetricRepository.deleteAll();
        projectRiskRepository.deleteAll();
    }
    
    @PostConstruct
    @Transactional
    public void initializeData() {
        if (!isDataEmpty()) {
            return;
        }

        // Initialize Projects
        List<Project> projects = new ArrayList<>();
        Calendar cal = Calendar.getInstance();

        // Website Redesign Project
        Project websiteRedesign = new Project();
        websiteRedesign.setName("Website Redesign");
        websiteRedesign.setBudget(80000);
        websiteRedesign.setSpent(35000);
        websiteRedesign.setBudgetStatus("On Budget");
        cal.set(2024, Calendar.JANUARY, 15);
        websiteRedesign.setStartDate(cal.getTime());
        cal.set(2024, Calendar.MAY, 30);
        websiteRedesign.setEndDate(cal.getTime());
        projects.add(websiteRedesign);

        // Mobile App Development
        Project mobileApp = new Project();
        mobileApp.setName("Mobile App Development");
        mobileApp.setBudget(150000);
        mobileApp.setSpent(165000);
        mobileApp.setBudgetStatus("Over Budget");
        cal.set(2024, Calendar.FEBRUARY, 1);
        mobileApp.setStartDate(cal.getTime());
        cal.set(2024, Calendar.JULY, 31);
        mobileApp.setEndDate(cal.getTime());
        projects.add(mobileApp);

        // Cloud Migration
        Project cloudMigration = new Project();
        cloudMigration.setName("Cloud Infrastructure Migration");
        cloudMigration.setBudget(200000);
        cloudMigration.setSpent(160000);
        cloudMigration.setBudgetStatus("Under Budget");
        cal.set(2024, Calendar.MARCH, 1);
        cloudMigration.setStartDate(cal.getTime());
        cal.set(2024, Calendar.SEPTEMBER, 30);
        cloudMigration.setEndDate(cal.getTime());
        projects.add(cloudMigration);

        // AI Integration
        Project aiIntegration = new Project();
        aiIntegration.setName("AI Feature Integration");
        aiIntegration.setBudget(120000);
        aiIntegration.setSpent(90000);
        aiIntegration.setBudgetStatus("On Budget");
        cal.set(2024, Calendar.APRIL, 15);
        aiIntegration.setStartDate(cal.getTime());
        cal.set(2024, Calendar.AUGUST, 31);
        aiIntegration.setEndDate(cal.getTime());
        projects.add(aiIntegration);

        // Security Audit
        Project securityAudit = new Project();
        securityAudit.setName("Security Infrastructure Audit");
        securityAudit.setBudget(60000);
        securityAudit.setSpent(45000);
        securityAudit.setBudgetStatus("On Budget");
        cal.set(2024, Calendar.MAY, 1);
        securityAudit.setStartDate(cal.getTime());
        cal.set(2024, Calendar.JUNE, 30);
        securityAudit.setEndDate(cal.getTime());
        projects.add(securityAudit);

        projectRepository.saveAll(projects);

        // Initialize Health Metrics
        List<HealthMetric> metrics = new ArrayList<>();

        HealthMetric onTrackProjects = new HealthMetric();
        onTrackProjects.setTitle("On Track Projects");
        onTrackProjects.setValue("3/5");
        onTrackProjects.setTrend("+12.5%");
        onTrackProjects.setProgress(75);
        onTrackProjects.setTrendIcon("TrendingUpIcon");
        onTrackProjects.setTrendColor("text-green-600");
        onTrackProjects.setProgressColor("bg-green-600");
        metrics.add(onTrackProjects);

        HealthMetric budgetCompliance = new HealthMetric();
        budgetCompliance.setTitle("Budget Compliance");
        budgetCompliance.setValue("85%");
        budgetCompliance.setTrend("-2.3%");
        budgetCompliance.setProgress(85);
        budgetCompliance.setTrendIcon("TrendingDownIcon");
        budgetCompliance.setTrendColor("text-red-600");
        budgetCompliance.setProgressColor("bg-blue-600");
        metrics.add(budgetCompliance);

        HealthMetric resourceUtilization = new HealthMetric();
        resourceUtilization.setTitle("Resource Utilization");
        resourceUtilization.setValue("92%");
        resourceUtilization.setTrend("+5.2%");
        resourceUtilization.setProgress(92);
        resourceUtilization.setTrendIcon("TrendingUpIcon");
        resourceUtilization.setTrendColor("text-green-600");
        resourceUtilization.setProgressColor("bg-purple-600");
        metrics.add(resourceUtilization);

        HealthMetric riskLevel = new HealthMetric();
        riskLevel.setTitle("Risk Level");
        riskLevel.setValue("Medium");
        riskLevel.setTrend("Stable");
        riskLevel.setProgress(45);
        riskLevel.setTrendIcon("TrendingUpIcon");
        riskLevel.setTrendColor("text-yellow-600");
        riskLevel.setProgressColor("bg-yellow-600");
        metrics.add(riskLevel);

        healthMetricRepository.saveAll(metrics);
        
        // Initialize Project Risks
        List<ProjectRisk> risks = new ArrayList<>();

        ProjectRisk technicalDebt = new ProjectRisk();
        technicalDebt.setName("Technical Debt");
        technicalDebt.setLevel("Medium");
        technicalDebt.setDescription("Increasing complexity in legacy systems requiring refactoring");
        technicalDebt.setImpact("Moderate");
        risks.add(technicalDebt);

        ProjectRisk resourceShortage = new ProjectRisk();
        resourceShortage.setName("Resource Shortage");
        resourceShortage.setLevel("High");
        resourceShortage.setDescription("Critical skill gaps in development team for AI integration");
        resourceShortage.setImpact("Severe");
        risks.add(resourceShortage);

        ProjectRisk scopeCreep = new ProjectRisk();
        scopeCreep.setName("Scope Creep");
        scopeCreep.setLevel("Medium");
        scopeCreep.setDescription("Expanding requirements in mobile app development");
        scopeCreep.setImpact("Moderate");
        risks.add(scopeCreep);

        ProjectRisk securityVulnerability = new ProjectRisk();
        securityVulnerability.setName("Security Vulnerability");
        securityVulnerability.setLevel("High");
        securityVulnerability.setDescription("Potential security gaps identified in cloud migration");
        securityVulnerability.setImpact("Severe");
        risks.add(securityVulnerability);

        ProjectRisk vendorDependency = new ProjectRisk();
        vendorDependency.setName("Vendor Dependency");
        vendorDependency.setLevel("Low");
        vendorDependency.setDescription("Reliance on third-party API services");
        vendorDependency.setImpact("Minor");
        risks.add(vendorDependency);

        projectRiskRepository.saveAll(risks);
    }
    
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }
    
    public List<HealthMetric> getAllHealthMetrics() {
        return healthMetricRepository.findAll();
    }
    
    public List<ProjectRisk> getAllProjectRisks() {
        return projectRiskRepository.findAll();
    }
}