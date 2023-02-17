CREATE TABLE IF NOT EXISTS auth_users (
    walletId TEXT PRIMARY KEY,
    userOrganization TEXT NOT NULL,
    userRole TEXT NOT NULL
        CHECK(userRole IN ('ADMIN', 'APPLICANT'))
        DEFAULT 'APPLICANT'
);

CREATE TABLE IF NOT EXISTS approval_queue (
    applicationId SERIAL PRIMARY KEY,
    applicationStatus TEXT
        CHECK (
            applicationStatus IN ('APPROVED', 'REJECTED', 'IN_PROGRESS')
        )
        DEFAULT 'IN_PROGRESS',

    walletId TEXT,
    applicantName TEXT NOT NULL,
    applicantUniqueId TEXT NOT NULL,
    applicantEmail TEXT NOT NULL,
    applicantComments TEXT DEFAULT NULL,

    appliedOrganization TEXT NOT NULL,
    CONSTRAINT fk_approval_queue_walletId FOREIGN KEY (walletId) REFERENCES auth_users(walletId),
    CONSTRAINT fk_approval_queue_appliedOrganization FOREIGN KEY (appliedOrganization) REFERENCES auth_users(userOrganization)
)