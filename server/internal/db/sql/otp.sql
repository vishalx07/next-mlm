CREATE TABLE "otp" (
  "id" VARCHAR(24) NOT NULL,
  "otp" INTEGER NOT NULL,
  "email" VARCHAR(256) NOT NULL,
  "purpose" otp_purpose NOT NULL,
  "valid_till" TIMESTAMPTZ NOT NULL,
  PRIMARY KEY ("id")
);