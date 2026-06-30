package com.jananijobs.backend.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JobSeekerProfileDto {
    private String title;
    private String bio;
    private BigDecimal currentSalary;
    private BigDecimal expectedSalary;
    private Integer noticePeriodDays;
    private String resumeUrl;
    private String portfolioUrl;
    private String githubUrl;
    private String linkedinUrl;
}