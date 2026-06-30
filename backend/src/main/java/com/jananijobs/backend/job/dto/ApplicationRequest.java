package com.jananijobs.backend.job.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationRequest {

    @NotBlank(message = "Resume location path or URL is required")
    private String resumeUrl;

    private String coverLetter;
}