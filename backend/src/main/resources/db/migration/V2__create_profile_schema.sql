-- Job Seekers Profile Table
CREATE TABLE job_seekers (
                             id UUID PRIMARY KEY,
                             title VARCHAR(100), -- e.g., "Senior Data Engineer"
                             bio TEXT,
                             current_salary NUMERIC(12, 2),
                             expected_salary NUMERIC(12, 2),
                             notice_period_days INT DEFAULT 30,
                             resume_url VARCHAR(512),
                             portfolio_url VARCHAR(255),
                             github_url VARCHAR(255),
                             linkedin_url VARCHAR(255),
                             created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                             updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                             CONSTRAINT fk_job_seeker_user FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE
);

-- Index for high-velocity searches on titles
CREATE INDEX idx_job_seekers_title ON job_seekers(title);