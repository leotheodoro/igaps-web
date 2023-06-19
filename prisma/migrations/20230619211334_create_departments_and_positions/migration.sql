-- CreateTable
CREATE TABLE "departments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "business_unit_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Position" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "goal" TEXT NOT NULL,
    "cbo" TEXT NOT NULL,
    "department_id" TEXT NOT NULL
);
