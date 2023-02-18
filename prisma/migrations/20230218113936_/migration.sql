/*
  Warnings:

  - The `department_name` column on the `Employee` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "department_name",
ADD COLUMN     "department_name" INTEGER;
