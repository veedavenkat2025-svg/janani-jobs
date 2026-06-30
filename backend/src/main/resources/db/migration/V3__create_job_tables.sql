-- Recruiter Profiles Table
CREATE TABLE recruiters (
                            id UUID PRIMARY KEY,
                            company_name VARCHAR(150) NOT NULL,
                            company_website VARCHAR(255),
                            designation VARCHAR(100),
                            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                            CONSTRAINT fk_recruiter_user FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE
);

-- Job Postings Table
CREATE TABLE jobs (
                      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                      recruiter_id UUID NOT NULL,
                      title VARCHAR(150) NOT NULL,
                      description TEXT NOT NULL,
                      requirements TEXT,
                      location VARCHAR(100) NOT NULL, -- e.g., "Remote", "Bangalore"
                      job_type VARCHAR(50) NOT NULL,    -- e.g., "FULL_TIME", "CONTRACT"
                      min_salary NUMERIC(12, 2),
                      max_salary NUMERIC(12, 2),
                      is_active BOOLEAN DEFAULT TRUE,
                      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                      CONSTRAINT fk_job_recruiter FOREIGN KEY (recruiter_id) REFERENCES recruiters(id) ON DELETE CASCADE
);

-- Indexing for rapid marketplace search performance
CREATE INDEX idx_jobs_title ON jobs(title);
CREATE INDEX idx_jobs_location ON jobs(location);
CREATE INDEX idx_jobs_salary ON jobs(min_salary, max_salary);