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

    @Query("SELECT j FROM Job j WHERE j.isActive = true " +
            "AND (CAST(:keyword AS string) IS NULL OR LOWER(j.title) LIKE LOWER(CONCAT('%', CAST(:keyword AS string), '%')) " +
            "OR LOWER(j.description) LIKE LOWER(CONCAT('%', CAST(:keyword AS string), '%'))) " +
            "AND (CAST(:location AS string) IS NULL OR LOWER(j.location) LIKE LOWER(CONCAT('%', CAST(:location AS string), '%'))) " +
            "AND (CAST(:jobType AS string) IS NULL OR LOWER(CAST(j.jobType AS string)) = LOWER(CAST(:jobType AS string))) " +
            "ORDER BY j.createdAt DESC")
    List<Job> searchJobs(
            @Param("keyword") String keyword,
            @Param("location") String location,
            @Param("jobType") String jobType
    );
}