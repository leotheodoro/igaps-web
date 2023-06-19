-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Position" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "goal" TEXT,
    "cbo" TEXT,
    "department_id" TEXT NOT NULL
);
INSERT INTO "new_Position" ("cbo", "department_id", "goal", "id") SELECT "cbo", "department_id", "goal", "id" FROM "Position";
DROP TABLE "Position";
ALTER TABLE "new_Position" RENAME TO "Position";
CREATE TABLE "new_business_units" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_business_units" ("id", "name") SELECT "id", "name" FROM "business_units";
DROP TABLE "business_units";
ALTER TABLE "new_business_units" RENAME TO "business_units";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
