package com.jananijobs.backend.user.repository;

import com.jananijobs.backend.user.entity.RecruiterProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository; // Ensure this import is here
import java.util.UUID;

@Repository // Add this annotation explicitly
public interface RecruiterProfileRepository extends JpaRepository<RecruiterProfile, UUID> {
}