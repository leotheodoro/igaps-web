/*
  Warnings:

  - You are about to drop the `hibernate_sequence` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "hibernate_sequence";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "business_units" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);
