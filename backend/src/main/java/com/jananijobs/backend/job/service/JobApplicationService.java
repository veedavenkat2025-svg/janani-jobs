package com.jananijobs.backend.job.service;

import com.jananijobs.backend.auth.entity.User;
import com.jananijobs.backend.auth.repository.UserRepository;
import com.jananijobs.backend.job.dto.ApplicationRequest;
import com.jananijobs.backend.job.dto.ApplicationResponse;
import com.jananijobs.backend.job.entity.Job;
import com.jananijobs.backend.job.entity.JobApplication;
import com.jananijobs.backend.job.entity.ApplicationStatus;
import com.jananijobs.backend.job.repository.JobApplicationRepository;
import com.jananijobs.backend.job.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class JobApplicationService {

    private final JobApplicationRepository applicationRepository;
    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    @Transactional
    public ApplicationResponse applyToJob(UUID jobId, String email, ApplicationRequest request) {
        User applicant = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job post not found with ID: " + jobId));

        if (!job.getIsActive()) {
            throw new RuntimeException("Cannot apply to an inactive job posting.");
        }

        if (applicationRepository.existsByJobIdAndApplicantId(jobId, applicant.getId())) {
            throw new RuntimeException("You have already submitted an application for this vacancy.");
        }

        JobApplication application = JobApplication.builder()
                .job(job)
                .applicant(applicant)
                .resumeUrl(request.getResumeUrl())
                .coverLetter(request.getCoverLetter())
                .status(ApplicationStatus.APPLIED)
                .build();

        JobApplication savedApplication = applicationRepository.save(application);
        return mapToResponse(savedApplication);
    }

    @Transactional(readOnly = true)
    public List<ApplicationResponse> getRecruiterDashboardApplications(String email) {
        User recruiter = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Recruiter not found: " + email));

        return applicationRepository.findAllByRecruiterId(recruiter.getId())
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional
    public ApplicationResponse updateStatus(UUID applicationId, String statusStr, String recruiterEmail) {
        JobApplication application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application record not found with ID: " + applicationId));

        // FIX: Added .getUser() to traverse from RecruiterProfile entity back to User core details safely
        String ownerEmail = application.getJob().getRecruiter().getUser().getEmail();

        if (!ownerEmail.equalsIgnoreCase(recruiterEmail)) {
            throw new RuntimeException("Access Denied: You are not authorized to manage applications for this job listing.");
        }

        try {
            application.setStatus(ApplicationStatus.valueOf(statusStr.toUpperCase()));
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid status value provided: " + statusStr);
        }

        JobApplication updatedApplication = applicationRepository.save(application);
        return mapToResponse(updatedApplication);
    }

    private ApplicationResponse mapToResponse(JobApplication app) {
        // FIX: Traversed via .getUser() here as well to pull corporate tracking name securely
        String companyName = app.getJob().getRecruiter().getCompanyName();

        return ApplicationResponse.builder()
                .applicationId(app.getId())
                .jobId(app.getJob().getId())
                .jobTitle(app.getJob().getTitle())
                .companyName(companyName)
                .applicantEmail(app.getApplicant().getEmail())
                .resumeUrl(app.getResumeUrl())
                .coverLetter(app.getCoverLetter())
                .status(app.getStatus())
                .appliedAt(app.getAppliedAt())
                .build();
    }
}