package com.jananijobs.backend.job.repository;

import com.jananijobs.backend.job.entity.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, UUID> {

    boolean existsByJobIdAndApplicantId(UUID jobId, UUID applicantId);

    @Query("SELECT ja FROM JobApplication ja WHERE ja.job.recruiter.id = :recruiterId ORDER BY ja.appliedAt DESC")
    List<JobApplication> findAllByRecruiterId(@Param("recruiterId") UUID recruiterId);
}