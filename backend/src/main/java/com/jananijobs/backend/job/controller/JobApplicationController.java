package com.jananijobs.backend.job.controller;

import com.jananijobs.backend.job.dto.ApplicationRequest;
import com.jananijobs.backend.job.dto.ApplicationResponse;
import com.jananijobs.backend.job.service.JobApplicationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/jobs")
@RequiredArgsConstructor
public class JobApplicationController {

    private final JobApplicationService applicationService;

    @PostMapping("/{jobId}/apply")
    public ResponseEntity<ApplicationResponse> applyToJob(
            @PathVariable UUID jobId,
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody ApplicationRequest request) {

        ApplicationResponse response = applicationService.applyToJob(jobId, userDetails.getUsername(), request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/recruiter/dashboard")
    public ResponseEntity<List<ApplicationResponse>> getRecruiterDashboard(
            @AuthenticationPrincipal UserDetails userDetails) {

        List<ApplicationResponse> dashboardData = applicationService.getRecruiterDashboardApplications(userDetails.getUsername());
        return ResponseEntity.ok(dashboardData);
    }

    @PatchMapping("/applications/{applicationId}/status")
    public ResponseEntity<ApplicationResponse> updateApplicationStatus(
            @PathVariable UUID applicationId,
            @RequestParam String status,
            @AuthenticationPrincipal UserDetails userDetails) {

        ApplicationResponse response = applicationService.updateStatus(applicationId, status, userDetails.getUsername());
        return ResponseEntity.ok(response);
    }
}