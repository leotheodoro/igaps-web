/*
  Warnings:

  - Added the required column `name` to the `Position` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Position" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "goal" TEXT,
    "cbo" TEXT,
    "department_id" TEXT NOT NULL
);
INSERT INTO "new_Position" ("cbo", "department_id", "goal", "id") SELECT "cbo", "department_id", "goal", "id" FROM "Position";
DROP TABLE "Position";
ALTER TABLE "new_Position" RENAME TO "Position";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
