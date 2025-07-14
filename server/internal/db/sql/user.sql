CREATE TABLE "user" (
  "id" VARCHAR(24) NOT NULL,
  "user_id" INTEGER NOT NULL,
  "fullname" VARCHAR(256) NOT NULL,
  "email" VARCHAR(256) NOT NULL,
  "password" VARCHAR(256),
  "role" user_role NOT NULL DEFAULT 'USER',
  "status" user_status NOT NULL DEFAULT 'ACTIVE',
  "avatar" VARCHAR(256),
  "country" VARCHAR(256) NOT NULL,
  "phone" VARCHAR(256) NOT NULL,
  "referral_id" INTEGER NOT NULL,
  "level" SMALLINT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL,
  "updated_at" TIMESTAMPTZ NOT NULL,
  PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "idx_user_email" ON "user" ("email");

CREATE UNIQUE INDEX IF NOT EXISTS "idx_user_user_id" ON "user" ("user_id");