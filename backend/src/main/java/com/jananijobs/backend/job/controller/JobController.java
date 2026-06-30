package com.jananijobs.backend.job.controller;

import com.jananijobs.backend.job.dto.JobRequest;
import com.jananijobs.backend.job.dto.JobResponse;
import com.jananijobs.backend.job.service.JobService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/jobs")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;

    @PostMapping
    @PreAuthorize("hasRole('RECRUITER')")
    public ResponseEntity<JobResponse> postJob(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody JobRequest jobRequest) {

        JobResponse response = jobService.createJob(userDetails.getUsername(), jobRequest);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}