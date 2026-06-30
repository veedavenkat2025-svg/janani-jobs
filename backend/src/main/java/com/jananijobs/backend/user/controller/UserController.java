package com.jananijobs.backend.user.controller;

import com.jananijobs.backend.user.dto.JobSeekerProfileDto;
import com.jananijobs.backend.user.dto.RecruiterProfileDto;
import com.jananijobs.backend.user.dto.UserProfileResponse; // <-- ADD THIS IMPORT
import com.jananijobs.backend.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserProfileResponse> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(userService.getCurrentUserProfile(userDetails.getUsername()));
    }

    @PutMapping("/me")
    public ResponseEntity<UserProfileResponse> updateProfile(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody JobSeekerProfileDto profileDto) {
        return ResponseEntity.ok(userService.updateJobSeekerProfile(userDetails.getUsername(), profileDto));
    }

    @PutMapping("/recruiter")
    @PreAuthorize("hasRole('RECRUITER')")
    public ResponseEntity<UserProfileResponse> updateRecruiterProfile(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody RecruiterProfileDto recruiterDto) {
        return ResponseEntity.ok(userService.updateRecruiterProfile(userDetails.getUsername(), recruiterDto));
    }
}