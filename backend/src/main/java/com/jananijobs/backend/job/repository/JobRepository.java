package com.jananijobs.backend.job.repository;

import com.jananijobs.backend.job.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface JobRepository extends JpaRepository<Job, UUID> {

    // Custom query to filter active jobs by keyword (title/description), location, and job type
    @Query("SELECT j FROM Job j WHERE j.isActive = true " +
            "AND (:keyword IS NULL OR LOWER(j.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(j.description) LIKE LOWER(CONCAT('%', :keyword, '%')))" +
            "AND (:location IS NULL OR LOWER(j.location) LIKE LOWER(CONCAT('%', :location, '%')))" +
            "AND (:jobType IS NULL OR LOWER(j.jobType) = LOWER(:jobType)) " +
            "ORDER BY j.createdAt DESC")
    List<Job> searchJobs(
            @Param("keyword") String keyword,
            @Param("location") String location,
            @Param("jobType") String jobType
    );
}