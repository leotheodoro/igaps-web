-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "access_level" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "hibernate_sequence" (
    "next_val" BIGINT
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
