/*
  Warnings:

  - You are about to drop the column `department_name` on the `Employee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "department_name",
ADD COLUMN     "department_Id" INTEGER;
