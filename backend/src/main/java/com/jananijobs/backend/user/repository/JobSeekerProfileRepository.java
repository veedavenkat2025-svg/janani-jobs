package com.jananijobs.backend.user.repository;

import com.jananijobs.backend.user.entity.JobSeekerProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface JobSeekerProfileRepository extends JpaRepository<JobSeekerProfile, UUID> {
}