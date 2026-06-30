package com.jananijobs.backend.job.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JobResponse {
    private UUID id;
    private String title;
    private String description;
    private String requirements;
    private String location;
    private String jobType;
    private BigDecimal minSalary;
    private BigDecimal maxSalary;
    private Boolean isActive;
    private String companyName;
    private String recruiterDesignation;
    private OffsetDateTime createdAt;
}