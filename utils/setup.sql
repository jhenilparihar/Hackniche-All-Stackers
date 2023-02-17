CREATE TABLE IF NOT EXISTS auth_users (
    walletId TEXT PRIMARY KEY,
    userOrganization TEXT NOT NULL,
    userRole TEXT NOT NULL
        CHECK(userRole IN ('ADMIN', 'APPLICANT'))
        DEFAULT 'APPLICANT'
);

CREATE TABLE IF NOT EXISTS user_applications (
    applicationId SERIAL PRIMARY KEY,
    applicationStatus TEXT
        CHECK (
            applicationStatus IN ('APPROVED', 'REJECTED', 'IN_PROGRESS')
        )
        DEFAULT 'IN_PROGRESS',

    walletId TEXT,

    -- TOKEN HASH FROM BLOCKCHAIN
    chainToken TEXT DEFAULT NULL,

    applicantName TEXT NOT NULL,
    applicantUniqueId TEXT NOT NULL,
    applicantGroup TEXT NOT NULL,
    applicantEmail TEXT NOT NULL,
    applicantComments TEXT DEFAULT NULL,

    appliedOrganization TEXT NOT NULL,
    CONSTRAINT fk_approval_queue_walletId FOREIGN KEY (walletId) REFERENCES auth_users(walletId)
)