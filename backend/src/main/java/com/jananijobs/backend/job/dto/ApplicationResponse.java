package com.jananijobs.backend.job.dto;

import com.jananijobs.backend.job.entity.ApplicationStatus;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationResponse {
    private UUID applicationId;
    private UUID jobId;
    private String jobTitle;
    private String companyName;
    private String applicantEmail;
    private String resumeUrl;
    private String coverLetter;
    private ApplicationStatus status;
    private LocalDateTime appliedAt;
}