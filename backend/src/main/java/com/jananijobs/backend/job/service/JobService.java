package com.jananijobs.backend.job.service;

import com.jananijobs.backend.auth.entity.User;
import com.jananijobs.backend.auth.repository.UserRepository;
import com.jananijobs.backend.job.dto.JobRequest;
import com.jananijobs.backend.job.dto.JobResponse;
import com.jananijobs.backend.job.entity.Job;
import com.jananijobs.backend.job.repository.JobRepository;
import com.jananijobs.backend.user.entity.RecruiterProfile;
import com.jananijobs.backend.user.repository.RecruiterProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JobService {

    private final JobRepository jobRepository;
    private final UserRepository userRepository;
    private final RecruiterProfileRepository recruiterProfileRepository;

    @Transactional
    public JobResponse createJob(String email, JobRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        RecruiterProfile recruiter = recruiterProfileRepository.findById(user.getId())
                .orElseThrow(() -> new RuntimeException("Recruiter profile must be created before posting a job."));

        Job job = Job.builder()
                .recruiter(recruiter)
                .title(request.getTitle())
                .description(request.getDescription())
                .requirements(request.getRequirements())
                .location(request.getLocation())
                .jobType(request.getJobType())
                .minSalary(request.getMinSalary())
                .maxSalary(request.getMaxSalary())
                .isActive(true)
                .build();

        Job savedJob = jobRepository.save(job);
        return mapToJobResponse(savedJob);
    }

    @Transactional(readOnly = true)
    public List<JobResponse> searchJobs(String keyword, String location, String jobType) {
        String searchKeyword = (keyword != null && !keyword.trim().isEmpty()) ? keyword.trim() : null;
        String searchLocation = (location != null && !location.trim().isEmpty()) ? location.trim() : null;
        String searchJobType = (jobType != null && !jobType.trim().isEmpty()) ? jobType.trim() : null;

        return jobRepository.searchJobs(searchKeyword, searchLocation, searchJobType)
                .stream()
                .map(this::mapToJobResponse)
                .collect(Collectors.toList());
    }

    private JobResponse mapToJobResponse(Job job) {
        return JobResponse.builder()
                .id(job.getId())
                .title(job.getTitle())
                .description(job.getDescription())
                .requirements(job.getRequirements())
                .location(job.getLocation())
                .jobType(job.getJobType())
                .minSalary(job.getMinSalary())
                .maxSalary(job.getMaxSalary())
                .isActive(job.getIsActive())
                .companyName(job.getRecruiter().getCompanyName())
                .recruiterDesignation(job.getRecruiter().getDesignation())
                .createdAt(job.getCreatedAt())
                .build();
    }
}