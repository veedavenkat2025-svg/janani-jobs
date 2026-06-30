package com.jananijobs.backend.job.entity;

import lombok.Getter;

@Getter
public enum ApplicationStatus {
    APPLIED,
    REVIEWING,
    SHORTLISTED,
    REJECTED,
    HIRED
}