package com.jananijobs.backend.user.service;

import com.jananijobs.backend.auth.entity.User;
import com.jananijobs.backend.auth.entity.Role;
import com.jananijobs.backend.auth.repository.UserRepository;
import com.jananijobs.backend.user.dto.JobSeekerProfileDto;
import com.jananijobs.backend.user.dto.RecruiterProfileDto;
import com.jananijobs.backend.user.dto.UserProfileResponse;
import com.jananijobs.backend.user.entity.JobSeekerProfile;
import com.jananijobs.backend.user.entity.RecruiterProfile;
import com.jananijobs.backend.user.repository.JobSeekerProfileRepository;
import com.jananijobs.backend.user.repository.RecruiterProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final JobSeekerProfileRepository seekerProfileRepository;
    private final RecruiterProfileRepository recruiterProfileRepository;

    @Transactional(readOnly = true)
    public UserProfileResponse getCurrentUserProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        JobSeekerProfile seekerProfile = seekerProfileRepository.findById(user.getId()).orElse(null);
        JobSeekerProfileDto seekerDto = null;
        if (seekerProfile != null) {
            seekerDto = JobSeekerProfileDto.builder()
                    .title(seekerProfile.getTitle())
                    .bio(seekerProfile.getBio())
                    .currentSalary(seekerProfile.getCurrentSalary())
                    .expectedSalary(seekerProfile.getExpectedSalary())
                    .noticePeriodDays(seekerProfile.getNoticePeriodDays())
                    .resumeUrl(seekerProfile.getResumeUrl())
                    .portfolioUrl(seekerProfile.getPortfolioUrl())
                    .githubUrl(seekerProfile.getGithubUrl())
                    .linkedinUrl(seekerProfile.getLinkedinUrl())
                    .build();
        }

        RecruiterProfile recruiterProfile = recruiterProfileRepository.findById(user.getId()).orElse(null);
        RecruiterProfileDto recruiterDto = null;
        if (recruiterProfile != null) {
            recruiterDto = RecruiterProfileDto.builder()
                    .companyName(recruiterProfile.getCompanyName())
                    .companyWebsite(recruiterProfile.getCompanyWebsite())
                    .designation(recruiterProfile.getDesignation())
                    .build();
        }

        return UserProfileResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .phoneNumber(user.getPhoneNumber())
                .roles(user.getRoles().stream().map(Role::getName).collect(Collectors.toSet()))
                .seekerProfile(seekerDto)
                .recruiterProfile(recruiterDto)
                .build();
    }

    @Transactional
    public UserProfileResponse updateJobSeekerProfile(String email, JobSeekerProfileDto dto) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        JobSeekerProfile profile = seekerProfileRepository.findById(user.getId())
                .orElseGet(() -> {
                    JobSeekerProfile newProfile = new JobSeekerProfile();
                    newProfile.setUser(user);
                    return newProfile;
                });

        profile.setTitle(dto.getTitle());
        profile.setBio(dto.getBio());
        profile.setCurrentSalary(dto.getCurrentSalary());
        profile.setExpectedSalary(dto.getExpectedSalary());
        profile.setNoticePeriodDays(dto.getNoticePeriodDays());
        profile.setResumeUrl(dto.getResumeUrl());
        profile.setPortfolioUrl(dto.getPortfolioUrl());
        profile.setGithubUrl(dto.getGithubUrl());
        profile.setLinkedinUrl(dto.getLinkedinUrl());

        seekerProfileRepository.save(profile);
        return getCurrentUserProfile(email);
    }

    @Transactional
    public UserProfileResponse updateRecruiterProfile(String email, RecruiterProfileDto dto) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        RecruiterProfile profile = recruiterProfileRepository.findById(user.getId())
                .orElseGet(() -> {
                    RecruiterProfile newProfile = new RecruiterProfile();
                    newProfile.setUser(user);
                    return newProfile;
                });

        profile.setCompanyName(dto.getCompanyName());
        profile.setCompanyWebsite(dto.getCompanyWebsite());
        profile.setDesignation(dto.getDesignation());

        recruiterProfileRepository.save(profile);
        return getCurrentUserProfile(email);
    }
}