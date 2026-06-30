package com.jananijobs.backend.user.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RecruiterProfileDto {
    @NotBlank(message = "Company name is required")
    @Size(max = 150, message = "Company name cannot exceed 150 characters")
    private String companyName;

    @Size(max = 255, message = "Website URL cannot exceed 255 characters")
    private String companyWebsite;

    @Size(max = 100, message = "Designation cannot exceed 100 characters")
    private String designation;
}